import React from 'react';
import { formatSecondsTime, normalize } from 'common/util';

const fontSizeRange = [7, 20];
const radiusRange = [10, 50];

const GraphNode = (maxScreentime, numNodes) => ({ node }) => {
  const stroke = '#708090';
  const fill = '#d7dce0';

  const normalizeScreentimeTo = normalize(node.totalScreentime, maxScreentime);
  const radius = normalizeScreentimeTo(radiusRange);
  const fontSize = normalizeScreentimeTo(fontSizeRange);

  const screentime = formatSecondsTime(node.totalScreentime);

  const renderImage = () => (
    <image
      href={node.img}
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
      fill={fill}
      stroke={stroke}
      r={radius}
    />
  )

  return (
    <>
      <g>
        <title>{screentime}</title>
        {node.img ? renderImage() : renderCircle()}
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