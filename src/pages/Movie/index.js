import React, { useState, useEffect } from 'react';
import Chart from 'react-frappe-charts';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';

import Loading from 'components/Loading';
import { getMovieFilename } from 'common/util';
import movies from 'common/constants/movies.json';
import styles from './styles.module.scss';

function Movie() {
  const { asin } = useParams();
  const [screentimeData, setScreentimeData] = useState([]);

  // only runs once when the component is first loaded or when the asin changes
  useEffect(() => {
    const movie = movies[asin];
    const filename = getMovieFilename(movie);
    axios.get(`/data/total_screentimes/${filename}`).then(({ data }) => {
      setScreentimeData(Papa.parse(data, { header: true, skipEmptyLines: true }).data);
    });
  }, [asin]);

  const formatSeconds = seconds => {
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    
    // used to add an 's' when num != 1
    const formatS = (num, type) => `${num} ${type}${num === 1 ? '' : 's'}`; 

    if (hours > 0) {
      return `${formatS(hours, 'hour')}, ${formatS(minutes, 'minute')}, ${formatS(seconds, 'second')}`;
    }
    if (minutes > 0) {
      return `${formatS(minutes, 'minute')}, ${formatS(seconds, 'second')}`;
    }
    return `${formatS(seconds, 'second')}`;
  }
  
  if (screentimeData.length >= 1) {
    console.log({
      labels: screentimeData.map(data => data.character),
      datasets: [{ values: screentimeData.map(data => data.screentime).map(Number)}]
    })
    return (
      <div className={styles.chart}>
        <Chart
          type="bar"
          height={500}
          colors={['#6610f2']}
          data={{
            labels: screentimeData.map(data => data.character),
            datasets: [{ values: screentimeData.map(data => data.screentime).map(Number)}]
          }}
          tooltipOptions={{
            formatTooltipY: formatSeconds,
          }}
        />
      </div>
    )
  }

  return <Loading />;
}

export default Movie;