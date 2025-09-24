namespace SegmentSniper.Services.Common
{
    public static class CommonConversionHelpers
    {

        private static readonly double MetersToMilesFactor = 1609.34;
        private static readonly double MilesPerHourConversionFactor = 2.23694;
        public static double ConvertMetersToMiles(double distance)
        {
            return distance / MetersToMilesFactor;
        }

        public static double ConvertMetersPerSecondToMilesPerHour(double speed)
        {
            return speed * MilesPerHourConversionFactor;
        }

        public static int ConvertToEpochTime(DateTime date)
        {
            DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return (int)(date - unixEpoch).TotalSeconds;
        }

        public static double CalculateAverageSpeed(double distanceInMeters, int timeInsecods)
        {
            double averageSpeed;
            double distanceInMiles = CommonConversionHelpers.ConvertMetersToMiles(distanceInMeters);
            double elapsedTimeInHours = timeInsecods / 3600.0; // Ensure floating-point division

            if (elapsedTimeInHours == 0)
            {
                // Handle division by zero error
                averageSpeed = 0; // Or throw an exception
            }
            else
            {
                averageSpeed = distanceInMiles / elapsedTimeInHours;
            }

            averageSpeed = Math.Round(averageSpeed, 2);

            return averageSpeed;
        }
    }
}
