export const timeFromSec = sec => {
  const minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}`;
}
