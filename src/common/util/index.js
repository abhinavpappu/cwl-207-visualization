export function getMovieFilename({ title, year }) {
  return `${title.replace(/[/\\?%*:|"<>]/g, '').replace(/ /g, '_')}_${year}.csv`;
}