export function convertTo12HourRange(timeRange: string): string {
  const to12Hour = (time: string): string => {
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // zamienia 0 na 12, 13 na 1 itd.
    return `${hour}:${minute} ${ampm}`;
  };

  const [start, end] = timeRange.split(' - ');
  return `${to12Hour(start)} - ${to12Hour(end)}`;
}
