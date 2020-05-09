import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './styles.module.scss';
import movieList from 'common/constants/movie-list.json';
import TotalScreentimes from 'components/TotalScreentimes';
import SharedScreentimeGraph from 'components/SharedScreentimeGraph';

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

  const currentValue = asin ? { value: asin, label: getLabel(movieList[asin]) } : null;
  return (
    <div className={styles.Movies}>
      <div className={styles.scrollSnap} />

      <div className={styles.movieSelect}>
        <Select
          placeholder="Select a movie..."
          value={currentValue}
          onChange={handleMovieSelect}
          options={movieOptions}
          isClearable
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#009688',
              primary25: '#80cbc4',
              primary50: '#52c7b8',
            },
          })}
        />
      </div>
      
      {movies[asin] && (
        <>
          <div className={styles.screentimeChart}>
            <TotalScreentimes characters={movies[asin].characters} key={asin} />
          </div>

          <div className={styles.sharedScreentimeGraph}>
            <SharedScreentimeGraph characters={movies[asin].characters} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieSearch;