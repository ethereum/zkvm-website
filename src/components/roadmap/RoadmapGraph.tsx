'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
  MarkerType,
} from '@xyflow/react';
import dagre from 'dagre';
import { RoadmapItem } from '@/lib/track-types';
import RoadmapNode from './RoadmapNode';
import RoadmapItemModal from './RoadmapItemModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Compact dagre settings
  dagreGraph.setGraph({
    rankdir: 'LR',
    ranksep: 80,        // tight horizontal spacing
    nodesep: 25,        // tight vertical spacing
    edgesep: 15,
    marginx: 20,
    marginy: 20,
  });

  // Use actual node dimensions
  const NODE_WIDTH = 180;
  const NODE_HEIGHT = 50;

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

export default function RoadmapGraph({ items }: RoadmapGraphProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<RoadmapItem | null>(null);

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
      },
      position: { x: 0, y: 0 }, // Will be set by dagre
    }));

    const edges: Edge[] = [];
    filteredItems.forEach((item) => {
      if (item.dependencies) {
        item.dependencies.forEach((depId) => {
          // Only add edge if the dependency is in filtered items
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

    return getLayoutedElements(nodes, edges);
  }, [filteredItems]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes/edges when filtered items change
  useMemo(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Update node and edge visibility based on hovered node (show only dependency subgraph)
  useEffect(() => {
    if (!hoveredNodeId) {
      // Reset all nodes and edges to visible
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
      // Use callback form to access current edges and compute subgraph
      setEdges((eds) => {
        // Build adjacency list for traversal
        const incomingEdgesMap = new Map<string, string[]>();
        eds.forEach((edge) => {
          if (!incomingEdgesMap.has(edge.target)) incomingEdgesMap.set(edge.target, []);
          incomingEdgesMap.get(edge.target)!.push(edge.source);
        });

        // Find all nodes in the dependency subgraph (BFS from hovered node going backwards)
        const subgraphNodeIds = new Set<string>();
        const queue = [hoveredNodeId];
        while (queue.length > 0) {
          const nodeId = queue.shift()!;
          if (subgraphNodeIds.has(nodeId)) continue;
          subgraphNodeIds.add(nodeId);
          const deps = incomingEdgesMap.get(nodeId) || [];
          deps.forEach(dep => queue.push(dep));
        }

        // Hide nodes not in subgraph
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            style: {
              ...node.style,
              opacity: subgraphNodeIds.has(node.id) ? 1 : 0,
            },
          }))
        );

        // Hide edges not in subgraph
        return eds.map((edge) => {
          const isInSubgraph = subgraphNodeIds.has(edge.source) && subgraphNodeIds.has(edge.target);
          return {
            ...edge,
            style: {
              ...edge.style,
              opacity: isInSubgraph ? 1 : 0,
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
          minZoom={0.1}
          maxZoom={1.5}
          elevateEdgesOnSelect={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />

          <Panel position="top-center" className="bg-background/95 backdrop-blur-sm border rounded-lg px-6 py-3 text-center">
            <h1 className="text-2xl font-bold">zkEVM Roadmap Visualization</h1>
            <p className="text-sm text-muted-foreground">Hover for details, click for more info</p>
          </Panel>

          {/* Legend */}
          <Panel position="top-right" className="bg-background/95 backdrop-blur-sm border rounded-lg p-3">
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

          <Panel position="top-left" className="bg-background/95 backdrop-blur-sm border rounded-lg p-4 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryNames[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
              Reset Filters
            </Button>

            <div className="pt-3 border-t text-xs text-muted-foreground space-y-1">
              <div>
                <span className="font-semibold text-foreground">{filteredItems.length}</span> items shown
              </div>
              <div>
                <span className="font-semibold text-foreground">{edges.length}</span> dependencies
              </div>
            </div>
          </Panel>
        </ReactFlow>

        {/* Bottom description panel */}
        <div className={`absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t transition-all duration-200 ${hoveredItem ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <div className="max-w-4xl mx-auto px-6 py-4">
            {hoveredItem && (
              <>
                <div className="font-semibold text-lg">{hoveredItem.title}</div>
                <p className="text-muted-foreground mt-1">{hoveredItem.description}</p>
                {hoveredItem.targetDate && (
                  <div className="text-sm text-muted-foreground mt-2">Target: {hoveredItem.targetDate}</div>
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
