'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
  MarkerType,
} from 'reactflow';
import dagre from 'dagre';
import { RoadmapItem } from '@/lib/track-types';
import RoadmapNode from './RoadmapNode';
import RoadmapItemModal from './RoadmapItemModal';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'reactflow/dist/style.css';

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

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 300, height: 150 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 150,
          y: nodeWithPosition.y - 75,
        },
      };
    }),
    edges,
  };
};

export default function RoadmapGraph({ items }: RoadmapGraphProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);

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
              type: ConnectionLineType.SmoothStep,
              animated: true,
              style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: 'hsl(var(--muted-foreground))',
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

  const handleReset = useCallback(() => {
    setSelectedCategory('all');
    setSelectedStatus('all');
  }, []);

  const categories = Object.keys(categoryNames);
  const statuses = ['not-started', 'in-progress', 'completed'];

  return (
    <>
      <div className="h-full w-full bg-background">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
        >
          <Background />
          <Controls />

          <Panel position="top-center" className="bg-background/95 backdrop-blur-sm border rounded-lg px-6 py-3">
            <h1 className="text-2xl font-bold">zkEVM Roadmap Visualization</h1>
            <p className="text-sm text-muted-foreground">Interactive dependency graph - Click nodes for details</p>
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
