using SegmentSniper.Models.Strava.Segment;
using System.Text.RegularExpressions;

namespace SegmentSniper.Services.Common
{
    public static class SegmentFormattingHelpers
    {
        public static XomsTimes GetXomTimeFromStrings(Xoms xoms)
        {
            return new XomsTimes
            {
                KomTime = GetTimeFromString(xoms.Kom),
                QomTime = GetTimeFromString(xoms.Qom)
            };
        }

        public static int GetTimeFromString(string time)
        {
            time = RemoveLetters(time);

            int returnTime = 0;
            string[] timeParts = time.Split(':');

            for (int i = 0; i <= timeParts.Length - 1; i++)
            {
                int factor = (int)Math.Pow(60, i);
                returnTime += int.Parse(timeParts[timeParts.Length - (i + 1)]) * factor;
            }
            return returnTime;
        }

        public static string RemoveLetters(string input)
        {
            Regex regex = new Regex("[^0-9:]");
            return regex.Replace(input, "");
        }

        public class XomsTimes
        {
            public int KomTime { get; set; }
            public int QomTime { get; set; }
        }

        public static string ConvertTimeInSeconds(int seconds)
        {
            int hours = seconds / 3600;
            int minutes = seconds / 60 - (hours * 60);
            int remainingSeconds = seconds - ((hours * 3600) + (minutes * 60));
            return $"{hours:D2}:{minutes:D2}:{remainingSeconds:D2}";
        }
    }
}
