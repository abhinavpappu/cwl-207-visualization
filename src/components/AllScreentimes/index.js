import React from 'react';
import Chart from 'react-google-charts';
import { convertSeconds } from 'common/util';
import colors from 'common/colors.json';

function AllScreentimes({ characters }) {
  const getDate = totalSeconds => {
    const { hours, minutes, seconds } = convertSeconds(totalSeconds);
    return new Date(2020, 0, 1, hours, minutes, seconds);
  }

  const headers = [
    { type: 'string', id: 'Character' },
    { type: 'string', id: 'Name' },
    { type: 'string', id: 'style', role: 'style' },
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'End' },
  ];

  const screentimeData = [];
  Object.entries(characters).forEach(([nconst, { timeRanges, name, actor, gender }]) => {
    timeRanges.forEach(timeRange => {
      screentimeData.push([
        `${name} (${actor})`,
        '',
        colors[gender].normal,
        getDate(timeRange[0]),
        getDate(timeRange[1]),
      ]);
    });
  });

  return (
    <Chart
      chartType="Timeline"
      height={window.innerHeight}
      data={[
        headers,
        ...screentimeData,
      ]}
      options={{
        fontName: 'Roboto',
      }}
    />
  )
}

export default AllScreentimes;