import React from 'react';
import { normalizeSquare } from 'common/util';
import colors from 'common/colors.json';

const strokeWidthRange = [1, 8]; 

const GraphEdge = maxSharedScreentime => ({ link, ...restProps }) => {
  const normalizeScreentimeTo = normalizeSquare(link.sharedScreentime, maxSharedScreentime);
  const strokeWidth = normalizeScreentimeTo(strokeWidthRange);

  return (
    <line
        {...restProps}
        stroke={colors.neutral.normal}
        strokeWidth={strokeWidth}
        style={{ content: link.sharedScreentime }}
    />
  )
};

export default GraphEdge;