'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import dagre from 'dagre';
import { RoadmapItem } from '@/lib/track-types';
import RoadmapNode from './RoadmapNode';
import RoadmapItemModal from './RoadmapItemModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Filter } from 'lucide-react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

interface RoadmapGraphProps {
  items: RoadmapItem[];
}

const categoryNames: Record<string, string> = {
  'client-integration': 'Client Integration',
  'real-time-proving': 'Benchmarks',
  'economic-security': 'Economic Security',
  'testing-validation': 'Testing & Validation',
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: 'LR' | 'TB' = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Adjust settings based on direction
  const isVertical = direction === 'TB';
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: isVertical ? 35 : 80,   // tighter vertical stacking on mobile
    nodesep: isVertical ? 15 : 25,   // tighter horizontal spacing on mobile
    edgesep: isVertical ? 8 : 15,
    marginx: isVertical ? 10 : 20,
    marginy: isVertical ? 10 : 20,
  });

  const NODE_WIDTH = 180;
  const NODE_HEIGHT = isVertical ? 60 : 50;  // taller nodes on mobile for larger text

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const positionedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x - NODE_WIDTH / 2,
        y: pos.y - NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: positionedNodes, edges };
};

function RoadmapGraphInner({ items }: RoadmapGraphProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<RoadmapItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { fitView } = useReactFlow();

  // Track screen size for layout direction
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const layoutDirection = isMobile ? 'TB' : 'LR';

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [items, selectedCategory, selectedStatus]);

  // Create nodes and edges
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = filteredItems.map((item) => ({
      id: item.id,
      type: 'roadmapNode',
      data: {
        item,
        onClick: () => setSelectedItem(item),
        direction: layoutDirection,
      },
      position: { x: 0, y: 0 },
    }));

    const edges: Edge[] = [];
    filteredItems.forEach((item) => {
      if (item.dependencies) {
        item.dependencies.forEach((depId) => {
          if (filteredItems.some(i => i.id === depId)) {
            edges.push({
              id: `${depId}-${item.id}`,
              source: depId,
              target: item.id,
              type: 'default',
              animated: false,
              zIndex: 0,
              style: { stroke: '#000000', strokeWidth: 1.5 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#000000',
              },
            });
          }
        });
      }
    });

    return getLayoutedElements(nodes, edges, layoutDirection);
  }, [filteredItems, layoutDirection]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes/edges when filtered items change and fit view
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, layoutDirection);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    // Fit view after layout with padding
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView, layoutDirection]);

  // Update node and edge visibility based on hovered node
  useEffect(() => {
    if (!hoveredNodeId) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: { ...node.style, opacity: 1 },
        }))
      );
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          style: { ...edge.style, opacity: 1 },
        }))
      );
    } else {
      setEdges((eds) => {
        const incomingEdgesMap = new Map<string, string[]>();
        eds.forEach((edge) => {
          if (!incomingEdgesMap.has(edge.target)) incomingEdgesMap.set(edge.target, []);
          incomingEdgesMap.get(edge.target)!.push(edge.source);
        });

        const subgraphNodeIds = new Set<string>();
        const queue = [hoveredNodeId];
        while (queue.length > 0) {
          const nodeId = queue.shift()!;
          if (subgraphNodeIds.has(nodeId)) continue;
          subgraphNodeIds.add(nodeId);
          const deps = incomingEdgesMap.get(nodeId) || [];
          deps.forEach(dep => queue.push(dep));
        }

        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            style: {
              ...node.style,
              opacity: subgraphNodeIds.has(node.id) ? 1 : 0.2,
            },
          }))
        );

        return eds.map((edge) => {
          const isInSubgraph = subgraphNodeIds.has(edge.source) && subgraphNodeIds.has(edge.target);
          return {
            ...edge,
            style: {
              ...edge.style,
              opacity: isInSubgraph ? 1 : 0.1,
            },
          };
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredNodeId]);

  const handleReset = useCallback(() => {
    setSelectedCategory('all');
    setSelectedStatus('all');
  }, []);

  const categories = Object.keys(categoryNames);
  const statuses = ['not-started', 'in-progress', 'complete'];
  const hasFilters = selectedCategory !== 'all' || selectedStatus !== 'all';

  const FilterContent = () => (
    <div className="space-y-2">
      <div className="space-y-1">
        <label className="text-xs font-medium">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-xs">
                {categoryNames[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium">Status</label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status} className="text-xs">
                {status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" onClick={handleReset} className="w-full h-7 text-xs">
        Reset
      </Button>

      <div className="pt-2 border-t text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{filteredItems.length}</span> items, <span className="font-semibold text-foreground">{edges.length}</span> deps
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full w-full bg-background relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={(_, node) => {
            setHoveredNodeId(node.id);
            setHoveredItem(node.data.item as RoadmapItem);
          }}
          onNodeMouseLeave={() => {
            setHoveredNodeId(null);
            setHoveredItem(null);
          }}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.Bezier}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.1}
          maxZoom={2}
          elevateEdgesOnSelect={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background />

          {/* Desktop filters - top left, below info panel */}
          <Panel position="top-left" className="hidden md:block bg-background/95 backdrop-blur-sm border rounded-lg p-2.5 !top-28">
            <FilterContent />
          </Panel>

          {/* Mobile filter button - top left, below info panel */}
          <Panel position="top-left" className="md:hidden !top-28">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="bg-background/95 backdrop-blur-sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasFilters && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Roadmap</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-6">
                  <FilterContent />
                  <DrawerClose asChild>
                    <Button className="w-full mt-4">Apply</Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </Panel>

          {/* Header - bottom center */}
          <Panel position="bottom-center" className="bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 md:px-6 md:py-3 text-center">
            <h1 className="text-base md:text-2xl font-bold">zkEVM Roadmap</h1>
            <p className="hidden md:block text-sm text-muted-foreground">Hover for details, click for more info</p>
          </Panel>

          {/* Legend - bottom right, hidden on mobile */}
          <Panel position="bottom-right" className="hidden sm:block bg-background/95 backdrop-blur-sm border rounded-lg p-3">
            <div className="text-xs font-medium mb-2">Status</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-3 rounded bg-background" style={{ border: '3px solid rgb(34 197 94)' }} />
                <span className="text-xs">Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-3 rounded bg-background" style={{ border: '3px solid rgb(59 130 246)' }} />
                <span className="text-xs">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-3 rounded bg-background" style={{ border: '3px solid rgb(156 163 175)' }} />
                <span className="text-xs">Not Started</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>

        {/* Top description panel */}
        <div className={`absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b transition-all duration-200 z-10 ${hoveredItem ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-4 py-3 md:px-6 md:py-4">
            {hoveredItem && (
              <>
                <div className="font-semibold text-base md:text-lg">{hoveredItem.title}</div>
                <p className="text-muted-foreground text-sm mt-1">{hoveredItem.description}</p>
                {hoveredItem.targetDate && (
                  <div className="text-xs md:text-sm text-muted-foreground mt-2">Target: {hoveredItem.targetDate}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedItem && (
        <RoadmapItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

export default function RoadmapGraph({ items }: RoadmapGraphProps) {
  return (
    <ReactFlowProvider>
      <RoadmapGraphInner items={items} />
    </ReactFlowProvider>
  );
}
