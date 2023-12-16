export const useConvertTimeStringToNumericValue = () => {
  function timeStringToNumericValue(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  }

  function numericTimeToString(timeNumber: number): string {
    const hours: number = timeNumber / 3600;
    const minutes: number = (timeNumber - hours * 3600) / 60;
    const seconds: number = timeNumber - hours * 3600 - minutes * 60;

    return `${hours}:${minutes}:${seconds}`;
  }

  return { timeStringToNumericValue, numericTimeToString };
};
