export const useFindHeading = () => {
  function calculateBearing(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const lat1 = toRadians(point1.lat);
    const lon1 = toRadians(point1.lng);
    const lat2 = toRadians(point2.lat);
    const lon2 = toRadians(point2.lng);

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    bearing = (bearing + 360) % 360;

    return bearing;
  }

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  function toDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  return { calculateBearing, toDegrees, toRadians };
};
