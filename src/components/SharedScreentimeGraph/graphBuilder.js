
export function buildGraph(characters) {
  const characterArray = Object.entries(characters);
  const nodes = generateNodes(characterArray);
  const edges = generateEdges(characterArray);
  return { nodes, edges };
}

function generateNodes(characters) {
  return characters.map(([nconst, { totalScreentime, name, actor, image, gender }]) => ({
    id: nconst,
    name,
    actor,
    image,
    gender,
    totalScreentime,
  }));
}

function generateEdges(characters) {
  const edges = [];
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      const [nconst1, character1] = characters[i];
      const [nconst2, character2] = characters[j];
      const sharedScreentime = calculateSharedScreentime(character1.timeRanges, character2.timeRanges);
      if (sharedScreentime > 0) {
        edges.push({
          source: nconst1,
          target: nconst2,
          sharedScreentime,
        })
      }
    }
  }
  return edges;
}

function calculateSharedScreentime(timeRanges1, timeRanges2) {
  let totalSharedScreentime = 0;
  timeRanges1.forEach(([startTime1, endTime1]) => {
    timeRanges2.forEach(([startTime2, endTime2]) => {
      const sharedScreentime = Math.min(endTime1, endTime2) - Math.max(startTime1, startTime2);
      if (sharedScreentime > 0) {
        totalSharedScreentime += sharedScreentime;
      }
    });
  });
  return totalSharedScreentime;
}
