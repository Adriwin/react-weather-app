// TODO: change the "en-US" to be connected to chosen language -> make language selector

const getCorrectTimestamp = (timestamp: number): number | undefined => {
  if (!timestamp || !Number(timestamp)) return;

  const dtLength = `${timestamp}`.length;
  if (!dtLength || ![10, 13].includes(dtLength)) return;
  return dtLength === 10 ? timestamp * 1000 : timestamp;
};

export const getDayOfTheWeekFromTimestamp = (
  timestamp: number
): string | undefined => {
  const correctDt = getCorrectTimestamp(timestamp);
  if (!correctDt) return;
  return new Date(correctDt).toLocaleDateString('en-GB', {
    weekday: 'long',
  });
};

export const getSimpleDateFromTimestamp = (
  timestamp: number,
  options?: Intl.DateTimeFormatOptions,
  mode?: 'date' | 'time'
): string | undefined => {
  const correctDt = getCorrectTimestamp(timestamp);
  if (!correctDt) return;
  return mode === 'date' || !mode
    ? new Date(correctDt).toLocaleDateString('en-GB', options).replace('/', '.')
    : new Date(correctDt).toLocaleTimeString('en-GB', options);
};
