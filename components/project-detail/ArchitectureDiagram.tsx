import type { Architecture } from "@/content/types";

const NODE_WIDTH = 168;
const NODE_HEIGHT = 56;
const NODE_GAP = 72;
const TOP_MARGIN = 24;
const ARC_GAP = 64;

export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { nodes, edges } = architecture;

  if (nodes.length === 0) return null;

  const positions = new Map(
    nodes.map((node, index) => [
      node.id,
      { x: index * (NODE_WIDTH + NODE_GAP), y: TOP_MARGIN },
    ]),
  );

  const width = nodes.length * NODE_WIDTH + (nodes.length - 1) * NODE_GAP;
  const height = TOP_MARGIN + NODE_HEIGHT + ARC_GAP + 32;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Architecture diagram"
    >
      <defs>
        <marker
          id="architecture-arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" className="fill-accent" />
        </marker>
      </defs>

      {edges.map((edge, index) => {
        const from = positions.get(edge.from);
        const to = positions.get(edge.to);
        if (!from || !to) return null;

        const fromIndex = nodes.findIndex((node) => node.id === edge.from);
        const toIndex = nodes.findIndex((node) => node.id === edge.to);
        const isForward = toIndex === fromIndex + 1;
        const key = `${edge.from}-${edge.to}-${index}`;

        if (isForward) {
          const startX = from.x + NODE_WIDTH;
          const startY = from.y + NODE_HEIGHT / 2;
          const endX = to.x - 6;
          const endY = to.y + NODE_HEIGHT / 2;

          return (
            <g key={key}>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                className="stroke-accent"
                strokeWidth={1.5}
                markerEnd="url(#architecture-arrowhead)"
              />
              {edge.label && (
                <text
                  x={(startX + endX) / 2}
                  y={startY - 10}
                  textAnchor="middle"
                  className="fill-gray-400 font-mono text-[10px] uppercase"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        }

        const fromCenterX = from.x + NODE_WIDTH / 2;
        const toCenterX = to.x + NODE_WIDTH / 2;
        const arcY = TOP_MARGIN + NODE_HEIGHT + ARC_GAP / 2;
        const path = `M ${fromCenterX} ${from.y + NODE_HEIGHT} C ${fromCenterX} ${arcY}, ${toCenterX} ${arcY}, ${toCenterX} ${to.y + NODE_HEIGHT}`;

        return (
          <g key={key}>
            <path
              d={path}
              fill="none"
              className="stroke-accent"
              strokeWidth={1.5}
              markerEnd="url(#architecture-arrowhead)"
            />
            {edge.label && (
              <text
                x={(fromCenterX + toCenterX) / 2}
                y={arcY + 16}
                textAnchor="middle"
                className="fill-gray-400 font-mono text-[10px] uppercase"
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {nodes.map((node) => {
        const pos = positions.get(node.id);
        if (!pos) return null;
        return (
          <g key={node.id}>
            <rect
              x={pos.x}
              y={pos.y}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={6}
              className="fill-surface-2 stroke-border"
              strokeWidth={1}
            />
            <text
              x={pos.x + NODE_WIDTH / 2}
              y={pos.y + NODE_HEIGHT / 2 + 4}
              textAnchor="middle"
              className="fill-white font-mono text-xs"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
