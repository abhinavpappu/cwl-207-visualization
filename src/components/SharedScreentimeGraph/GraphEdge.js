import React from 'react';
import { normalizeSquare } from 'common/util';

const strokeWidthRange = [1, 8]; 

const GraphEdge = maxSharedScreentime => ({ link, ...restProps }) => {
  const normalizeScreentimeTo = normalizeSquare(link.sharedScreentime, maxSharedScreentime);
  const strokeWidth = normalizeScreentimeTo(strokeWidthRange);

  const stroke = '#009688';

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