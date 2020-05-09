import React from 'react';
import Graph from 'react-graph-network';

import { buildGraph } from './graphBuilder';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';

function SharedScreentimeGraph({ characters }) {
  const { nodes, edges } = buildGraph(characters);

  const maxScreentime = nodes.reduce((max, current) => Math.max(current.totalScreentime, max), 0);
  const maxSharedScreentime = edges.reduce((max, current) => Math.max(current.sharedScreentime, max), 0);

  return (
    <Graph
      data={{ nodes, links: edges }}
      NodeComponent={GraphNode(maxScreentime, nodes.length)}
      LineComponent={GraphEdge(maxSharedScreentime)}
      enableDrag
      // pullIn
      zoomDepth={1}
      hoverOpacity={.3}
      nodeDistance={1500}
    />
  )
}

export default SharedScreentimeGraph;