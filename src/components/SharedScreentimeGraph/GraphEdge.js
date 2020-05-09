import React from 'react';
import { normalizeSquare } from 'common/util';

const strokeWidthRange = [1, 7]; 

const GraphEdge = maxSharedScreentime => ({ link, ...restProps }) => {
  const normalizeScreentimeTo = normalizeSquare(link.sharedScreentime, maxSharedScreentime);
  const strokeWidth = normalizeScreentimeTo(strokeWidthRange);

  const stroke = 'steelblue';

  return (
    <line
        {...restProps}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ content: link.sharedScreentime }}
    />
  )
};

export default GraphEdge;