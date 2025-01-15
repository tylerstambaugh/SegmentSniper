export const useConversionHelpers = () => {
  function ConvertMetersToMiles(meters: number | undefined): string {
    if (meters === undefined) {
      return 'No data';
    }
    const miles = meters * 0.000621371192;
    return miles.toFixed(2);
  }

  return { ConvertMetersToMiles };
};
