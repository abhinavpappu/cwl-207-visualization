import React from 'react';
import Chart from 'react-google-charts';
import colors from 'common/colors.json';

function GenderPieChart({ genderScreentimes }) {

  return (
    <Chart
      chartType="PieChart"
      height={150}
      width={200}
      data={[
        ['Gender', 'Screentime'],
        ['Male', genderScreentimes.male],
        ['Female', genderScreentimes.female],
      ]}
      options={{
        slices: [
          { color: colors.male.normal },
          { color: colors.female.normal },
        ],
        tooltip: {
          text: 'percentage',
        },
        legend: {
          position: 'none',
        },
        chartArea: {
          top: 10,
          right: 0,
          bottom: 10,
          left: 0,
        },
        fontName: 'Roboto',
        fontSize: 11
      }}
    />
  )
}

export default GenderPieChart;