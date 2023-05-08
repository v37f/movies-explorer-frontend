export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return  (hours ? `${hours}ч ` : "") + `${minutes}м`
}

