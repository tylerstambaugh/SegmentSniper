using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Services.Common
{
    public static class CommonConversionHelpers
    {

        private static readonly double MetersToMilesFactor = 1609;
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
    }
}
