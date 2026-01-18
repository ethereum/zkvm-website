'use client';

import { useState } from 'react';
import { DependencyGraph as DependencyGraphType, GraphNode, GraphEdge } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DependencyGraphProps {
  graph: DependencyGraphType;
}

export default function DependencyGraph({ graph }: DependencyGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 500;
  const padding = 40;

  // Helper to get node color based on type and status
  const getNodeColor = (node: GraphNode) => {
    if (node.status === 'complete') return '#10b981'; // green
    if (node.status === 'in-progress') return '#f59e0b'; // orange
    if (node.status === 'blocked') return '#ef4444'; // red
    return '#6b7280'; // gray
  };

  // Helper to get node stroke color
  const getNodeStroke = (node: GraphNode) => {
    if (hoveredNode === node.id) return '#3b82f6'; // blue when hovered
    return getNodeColor(node);
  };

  // Helper to get edge color based on type
  const getEdgeColor = (edge: GraphEdge) => {
    if (edge.type === 'blocks') return '#ef4444'; // red
    if (edge.type === 'depends-on') return '#f59e0b'; // orange
    return '#6b7280'; // gray for 'enables'
  };

  // Helper to check if edge is connected to hovered node
  const isEdgeHighlighted = (edge: GraphEdge) => {
    if (!hoveredNode) return false;
    return edge.from === hoveredNode || edge.to === hoveredNode;
  };

  // Convert percentage positions to actual coordinates
  const getCoords = (x: number, y: number) => ({
    x: padding + (x / 100) * (width - 2 * padding),
    y: padding + (y / 100) * (height - 2 * padding)
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Dependency Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Info banner */}
          <div className="flex gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-100">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              This graph shows dependencies between clients, milestones, and integration points.
              Hover over nodes for details.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-600" />
              <span>Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-400" />
              <span>Not Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-600" />
              <span>Blocked</span>
            </div>
          </div>

          {/* SVG Graph */}
          <TooltipProvider>
            <div className="overflow-x-auto">
              <svg
                width={width}
                height={height}
                className="min-w-[800px] rounded-lg border bg-muted/30"
                role="img"
                aria-label="Dependency graph showing relationships between clients and milestones"
              >
                {/* Draw edges first (so they appear behind nodes) */}
                <g className="edges">
                  {graph.edges.map((edge, idx) => {
                    const fromNode = graph.nodes.find(n => n.id === edge.from);
                    const toNode = graph.nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const fromCoords = getCoords(fromNode.x, fromNode.y);
                    const toCoords = getCoords(toNode.x, toNode.y);

                    const isHighlighted = isEdgeHighlighted(edge);

                    return (
                      <g key={`edge-${idx}`}>
                        {/* Arrow line */}
                        <line
                          x1={fromCoords.x}
                          y1={fromCoords.y}
                          x2={toCoords.x}
                          y2={toCoords.y}
                          stroke={getEdgeColor(edge)}
                          strokeWidth={isHighlighted ? 3 : 2}
                          strokeDasharray={edge.type === 'depends-on' ? '5,5' : undefined}
                          opacity={isHighlighted ? 1 : 0.6}
                          markerEnd={`url(#arrowhead-${edge.type})`}
                          onMouseEnter={() => setHoveredEdge(`${edge.from}-${edge.to}`)}
                          onMouseLeave={() => setHoveredEdge(null)}
                          className="transition-all cursor-pointer"
                        />
                        {/* Edge label */}
                        {edge.label && (
                          <text
                            x={(fromCoords.x + toCoords.x) / 2}
                            y={(fromCoords.y + toCoords.y) / 2 - 5}
                            fontSize="10"
                            fill="currentColor"
                            className="text-xs"
                            textAnchor="middle"
                          >
                            {edge.label}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* Define arrowheads */}
                <defs>
                  <marker
                    id="arrowhead-enables"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
                  </marker>
                  <marker
                    id="arrowhead-depends-on"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                  </marker>
                  <marker
                    id="arrowhead-blocks"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                  </marker>
                </defs>

                {/* Draw nodes */}
                <g className="nodes">
                  {graph.nodes.map((node) => {
                    const coords = getCoords(node.x, node.y);
                    const radius = node.type === 'integration-point' ? 30 : 25;
                    const isHovered = hoveredNode === node.id;

                    return (
                      <Tooltip key={node.id}>
                        <TooltipTrigger asChild>
                          <g
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            className="cursor-pointer transition-transform"
                            style={{
                              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                              transformOrigin: `${coords.x}px ${coords.y}px`
                            }}
                          >
                            {/* Node circle */}
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r={radius}
                              fill={getNodeColor(node)}
                              stroke={getNodeStroke(node)}
                              strokeWidth={isHovered ? 3 : 2}
                              opacity={0.9}
                            />
                            {/* Node label */}
                            <text
                              x={coords.x}
                              y={coords.y}
                              fontSize="12"
                              fontWeight="600"
                              fill="white"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              pointerEvents="none"
                            >
                              {node.label}
                            </text>
                          </g>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{node.label}</p>
                            <p className="text-xs text-muted-foreground">{node.description}</p>
                            <p className="text-xs">
                              Status: <span className="font-medium capitalize">{node.status.replace('-', ' ')}</span>
                            </p>
                            <p className="text-xs">
                              Type: <span className="font-medium capitalize">{node.type.replace('-', ' ')}</span>
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </g>
              </svg>
            </div>
          </TooltipProvider>

          {/* Node details on mobile */}
          <div className="md:hidden space-y-2">
            <p className="text-sm font-medium">Nodes:</p>
            <div className="space-y-1">
              {graph.nodes.map(node => (
                <div key={node.id} className="flex items-center gap-2 text-xs">
                  <div
                    className="h-3 w-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getNodeColor(node) }}
                  />
                  <span className="font-medium">{node.label}</span>
                  <span className="text-muted-foreground">- {node.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
