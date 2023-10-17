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
    }
}
