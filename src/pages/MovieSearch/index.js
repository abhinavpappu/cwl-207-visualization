import React from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import movies from 'common/constants/movies.json';
import styles from './styles.module.scss';

function MovieSearch() {
  const history = useHistory();

  const options = Object.entries(movies).map(([asin, { title, year }]) => ({
    label: `${title} (${year})`,
    value: asin,
  }));

  return (
    <div className={styles.MovieSearch}>
      <Select
        className={styles.movieSelect}
        placeholder="Select a movie..."
        onChange={({ value }) => history.push(`/movies/${value}`)}
        options={options}
      />
    </div>
  );
}

export default MovieSearch;