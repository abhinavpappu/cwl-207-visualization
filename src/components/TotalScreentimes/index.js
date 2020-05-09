import React from 'react';
import Chart from 'react-frappe-charts';

import { formatSecondsText } from 'common/util';

function TotalScreentimes({ characters }) {
  // get characters and sort descending by total screentime
  characters = Object.values(characters)
    .sort(({ totalScreentime: time1, }, { totalScreentime: time2 }) => time2 - time1);
  
  const actorToCharacterMap = {};
  characters.forEach(({ actor, name }) => actorToCharacterMap[actor] = name);

  return (
    <Chart
      type="bar"
      height={500}
      colors={['#6610f2']}
      data={{
        labels: characters.map(character => character.actor),
        datasets: [{ values: characters.map(character => character.totalScreentime)}]
      }}
      tooltipOptions={{
        formatTooltipY: formatSecondsText,
        formatTooltipX: actor => `${actor} (${actorToCharacterMap[actor]})`,
      }}
      // key={asin} // forces the chart to completely rerender when the asin changes
    />
  )
}

export default TotalScreentimes;