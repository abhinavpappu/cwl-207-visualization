import React from 'react';
import Chart from 'react-google-charts';

function GenderRevenueChart({ movies }) {  
  const averageRevenueByPercentFemale = Array(10).fill(0);
  const moviesWithRevenues = Object.values(movies).filter(({ revenue }) => revenue);
  for (let i = 0; i < 10; i++) {
    let totalRevenue = 0;
    let numMovies = 0;
    moviesWithRevenues.forEach(({ genderScreentimes, revenue }) => {
      const { male, female } = genderScreentimes;
      const femaleScreentimePercent = (female / (male + female)) * 100;
      if (femaleScreentimePercent >= i*10 && femaleScreentimePercent < i*10 + 10) {
        totalRevenue += revenue;
        numMovies++;
      }
    });

    if (numMovies >= 1) {
      averageRevenueByPercentFemale[i] = totalRevenue / numMovies;
    }
  }

  console.log(moviesWithRevenues.map(({ genderScreentimes: { male, female } }) => (female / (male + female))));

  const headers = ['% Female Screentime', 'Average Revenue'];
  const data = averageRevenueByPercentFemale.map((revenue, i) => ([
    `${i * 10}% - ${(i + 1) * 10}%`,
    revenue,
  ]));

  console.log(data);

  return (
    <Chart
      chartType="Bar"
      height={500}
      data={[
        headers,
        ...data,
      ]}
      options={{
        fontName: 'Roboto',
        chart: {
          title: " % Female Screentime vs Average Movie Revenue"
        }
      }}
    />
  )
}

export default GenderRevenueChart;