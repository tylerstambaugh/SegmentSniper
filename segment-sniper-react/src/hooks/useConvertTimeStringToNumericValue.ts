export const useConvertTimeStringToNumericValue = () => {
  function timeStringToNumericValue(timeString: string): number {
    let totalSeconds = 0;
    if (timeString.split(":").length === 3) {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);

      totalSeconds = hours * 3600 + minutes * 60 + seconds;

      return totalSeconds;
    }
    if (timeString.split(":").length === 2) {
      const [minutes, seconds] = timeString.split(":").map(Number);
      totalSeconds = minutes * 60 + seconds;
    }
    return totalSeconds;
  }

  function numericTimeToString(timeNumber: number): string {
    const hours: number = Math.floor(timeNumber / 3600);
    const minutes: number = Math.floor((timeNumber - hours * 3600) / 60);
    const seconds: number = Math.floor(
      timeNumber - hours * 3600 - minutes * 60
    );

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const returnString =
      hours > 0
        ? `${hours}:${minutes}:${formattedSeconds}`
        : `${minutes}:${formattedSeconds}`;
    return returnString;
  }

  return { timeStringToNumericValue, numericTimeToString };
};
