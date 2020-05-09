export function getMovieFilename({ title, year }) {
  return `${title.replace(/[/\\?%*:|"<>]/g, '').replace(/ /g, '_')}_${year}.csv`;
}

export function convertSeconds(seconds) {
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return { hours, minutes, seconds };
}

export function formatSecondsText(totalSeconds) {
  const { hours, minutes, seconds } = convertSeconds(totalSeconds);

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

export function formatSecondsTime(totalSeconds) {
  const { hours, minutes, seconds } = convertSeconds(totalSeconds);
  const pad = num => String(num).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const normalize = (value, valueMax) => ([min, max]) => (value / valueMax) * (max - min) + min;
export const normalizeSquare = (value, valueMax) => ([min, max]) => Math.pow(value / valueMax, 2) * (max - min) + min;
