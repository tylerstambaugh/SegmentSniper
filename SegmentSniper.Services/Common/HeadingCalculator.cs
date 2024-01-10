namespace SegmentSniper.Services.Common
{
    public static class HeadingCalculator
    {
        public static string CalculateBearing(List<double> startLatLng, List<double> endLatLng)
        {
            double lat1 = ToRadians(startLatLng[0]);
            double lon1 = ToRadians(startLatLng[1]);
            double lat2 = ToRadians(endLatLng[0]);
            double lon2 = ToRadians(endLatLng[1]);

            double y = Math.Sin(lon2 - lon1) * Math.Cos(lat2);
            double x = Math.Cos(lat1) * Math.Sin(lat2) - Math.Sin(lat1) * Math.Cos(lat2) * Math.Cos(lon2 - lon1);

            double bearing = Math.Atan2(y, x);
            bearing = ToDegrees(bearing);
            bearing = (bearing + 360) % 360;

            if ((bearing > 337.5 && bearing <= 360) || (bearing > 0 && bearing <= 22.5))
            {
                return Headings.North;
            }
            else if (bearing > 22.5 && bearing <= 67.5)
            {
                return Headings.NorthEast;
            }
            else if (bearing > 67.5 && bearing <= 112.5)
            {
                return Headings.East;
            }
            else if (bearing > 112.5 && bearing <= 157.5)
            {
                return Headings.SouthEast;
            }
            else if (bearing > 157.5 && bearing <= 202.5)
            {
                return Headings.South;
            }
            else if (bearing > 202.5 && bearing <= 247.5)
            {
                return Headings.SouthWest;
            }
            else if (bearing > 247.5 && bearing <= 292.5)
            {
                return Headings.West;
            }
            else if (bearing > 292.5 && bearing <= 337.5)
            {
                return Headings.NorthWest;
            }
            else
            {
                return "Unknown";
            }
        }

        private static double ToRadians(double degrees)
        {
            return degrees * (Math.PI / 180);
        }

        private static double ToDegrees(double radians)
        {
            return radians * (180 / Math.PI);
        }
    }

    public static class Headings
    {
        public const string North = "↑ N";
        public const string NorthEast = "↗ NE";
        public const string East = "→ E";
        public const string SouthEast = "↘ SE";
        public const string South = "↓ S";
        public const string SouthWest = "↙ SW";
        public const string West = "← W";
        public const string NorthWest = "↖ NW";
    }
}
