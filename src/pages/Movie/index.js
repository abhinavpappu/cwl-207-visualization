import React from 'react';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';

import styles from './styles.module.scss';
import movies from 'common/movies.json';
import colors from 'common/colors.json';
import TotalScreentimes from 'components/TotalScreentimes';
import SharedScreentimeGraph from 'components/SharedScreentimeGraph';
import AllScreentimes from 'components/AllScreentimes';
import GenderPieChart from 'components/GenderPieChart';

const getLabel = ({ title, year }) => `${title} (${year})`
const movieOptions = Object.entries(movies).map(([asin, movieDetails]) => ({
  label: getLabel(movieDetails),
  value: asin,
}));

function MovieSearch() {
  const { asin } = useParams();
  const history = useHistory();

  const handleMovieSelect = selection => {
    if (selection) {
      const { value: asin } = selection;
      history.push(`/movie/${asin}`);
    } else {
      history.push('/movie');
    }
  }

  const selectedMovie = asin ? { value: asin, label: getLabel(movies[asin]) } : null;
  return (
    <div className={styles.Movies}>
      <div className={styles.scrollSnap} />

      <div className={styles.movieSelect}>
        <Select
          placeholder="Select a movie..."
          value={selectedMovie}
          onChange={handleMovieSelect}
          options={movieOptions}
          isClearable
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: colors.neutral.dark,
              primary25: colors.neutral.light,
              primary50: colors.neutral.normal,
            },
          })}
        />
      </div>
      
      {movies[asin] && (
        <>
          <div className={styles.header}>
            <GenderPieChart genderScreentimes={movies[asin].genderScreentimes} />

            <div className={styles.contentList}>
              <h3>Visualizations</h3>
              <a className={styles.item} href="#total-screentime">1. Total Screentime by Character</a>
              <a className={styles.item} href="#shared-screentime">2. Shared Screentime between Characters</a>
              <a className={styles.item} href="#all-screentimes">3. All Scenes by Character</a>
            </div>

            <div className={styles.colorLegend}>
              {['male', 'female'].map(colorKey => (
                <div className={styles.colorRow}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: colors[colorKey].light, borderColor: colors[colorKey].normal }}
                  />
                  <span className={styles.colorText}>{colorKey}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div id="total-screentime" className={styles.screentimeChart}>
            <TotalScreentimes characters={movies[asin].characters} />
          </div>

          <div id="shared-screentime" className={styles.sharedScreentimeGraph}>
            <SharedScreentimeGraph characters={movies[asin].characters} />
          </div>

          <div id="all-screentimes" className={styles.allScreentimesChart}>
            <AllScreentimes characters={movies[asin].characters} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieSearch;