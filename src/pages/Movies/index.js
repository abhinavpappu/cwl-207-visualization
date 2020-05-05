import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-frappe-charts';

import movieList from 'common/constants/movie-list.json';
import styles from './styles.module.scss';

const getLabel = ({ title, year }) => `${title} (${year})`
const movieOptions = Object.entries(movieList).map(([asin, movieDetails]) => ({
  label: getLabel(movieDetails),
  value: asin,
}));

function MovieSearch() {
  const { asin } = useParams();
  const history = useHistory();
  
  const [movies, setMovies] = useState({});

  useEffect(() => {
    axios.get('/data/movies.json').then(response => setMovies(response.data));
  }, []);

  const handleMovieSelect = selection => {
    if (selection) {
      const { value: asin } = selection;
      history.push(`/movies/${asin}`);
    } else {
      history.push('/movies');
    }
  }

  const renderChart = () => {
    if (movies[asin]) {
      // get characters in specified movie and sort descending by screentime
      const characters = Object.values(movies[asin].characters)
        .sort(({ totalScreentime: time1, }, { totalScreentime: time2 }) => time2 - time1);

      const actorToCharacterMap = {};
      characters.forEach(({ actor, name }) => actorToCharacterMap[actor] = name);
      
      return (
        <div className={styles.chart}>
          <Chart
            type="bar"
            height={500}
            colors={['#6610f2']}
            data={{
              labels: characters.map(character => character.actor),
              datasets: [{ values: characters.map(character => character.totalScreentime)}]
            }}
            tooltipOptions={{
              formatTooltipY: formatSeconds,
              formatTooltipX: actor => `${actor} (${actorToCharacterMap[actor]})`,
            }}
          />
        </div>
      )
    }
  }

  const currentValue = asin ? { value: asin, label: getLabel(movieList[asin]) } : null;
  return (
    <div className={styles.Movies}>
      <div className={styles.movieSelect}>
        <Select
          placeholder="Select a movie..."
          value={currentValue}
          onChange={handleMovieSelect}
          options={movieOptions}
          isClearable
        />
      </div>
      
      {renderChart()}
    </div>
  );
}

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

export default MovieSearch;