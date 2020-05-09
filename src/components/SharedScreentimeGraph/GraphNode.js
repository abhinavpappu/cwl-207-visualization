import React from 'react';
import { formatSecondsTime, normalize } from 'common/util';
import colors from 'common/colors.json';

const fontSizeRange = [7, 20];
const radiusRange = [15, 55];

const GraphNode = (maxScreentime, numNodes) => ({ node }) => {
  const normalizeScreentimeTo = normalize(node.totalScreentime, maxScreentime);
  const radius = normalizeScreentimeTo(radiusRange);
  const fontSize = normalizeScreentimeTo(fontSizeRange);

  const screentime = formatSecondsTime(node.totalScreentime);

  const renderImage = () => (
    <image
      href={node.image}
      x="0"
      y="0"
      height={radius * 2}
      width={radius * 2}
      style={{
        transform: `translate(-${radius}px, -${radius}px)`,
      }}
    />
  );

  const renderCircle = () => (
    <circle
      fill={colors[node.gender].light}
      stroke={colors[node.gender].normal}
      strokeWidth={2}
      r={radius}
    />
  )

  return (
    <>
      <g>
        <title>{`${node.actor}\n${screentime}`}</title>
        {node.image ? renderImage() : renderCircle()}
      </g>

      <g style={{ fontSize: fontSize + 'px' }}>
        <text
          textAnchor="middle"
          y={radius + 16}
        >
          {node.name}
        </text>
      </g>

    </>
  );
};

export default GraphNode;