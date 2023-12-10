import { Headings } from "../enums/Headings";

export const useFindHeading = () => {
  function calculateBearing(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): string {
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

    switch (true) {
      case (bearing > 337.5 && bearing <= 360) ||
        (bearing > 0 && bearing <= 22.5):
        return Headings.North;
      case bearing > 22.5 && bearing <= 67.5:
        return Headings.NorthEast;
      case bearing > 67.5 && bearing <= 112.5:
        return Headings.East;
      case bearing > 112.5 && bearing <= 157.5:
        return Headings.SouthEast;
      case bearing > 157.5 && bearing <= 202.5:
        return Headings.South;
      case bearing > 202.5 && bearing <= 247.5:
        return Headings.SouthWest;
      case bearing > 247.5 && bearing <= 292.5:
        return Headings.West;
      case bearing > 292.5 && bearing <= 337.5:
        return Headings.NorthWest;
      default:
        return "Unknown";
    }
  }

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  function toDegrees(radians: number) {
    return radians * (180 / Math.PI);
  }

  return { calculateBearing };
};
