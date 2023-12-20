export const useConvertTimeStringToNumericValue = () => {
  function timeStringToNumericValue(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  }

  function numericTimeToString(timeNumber: number): string {
    const hours: number = Math.floor(timeNumber / 3600);
    const minutes: number = Math.floor((timeNumber - hours * 3600) / 60);
    const seconds: number = Math.floor(
      timeNumber - hours * 3600 - minutes * 60
    );

    let returnString =
      hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    return returnString;
  }

  return { timeStringToNumericValue, numericTimeToString };
};
