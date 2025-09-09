using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Models.Strava.Segment
{
    public class LocalLegend
    {
        public long AthleteId { get; set; }
        public string Title { get; set; }
        public string Profile { get; set; }
        public string EffortDescription { get; set; }
        public string EffortCount { get; set; }
        public EffortCountsModel EffortCounts { get; set; }
    }

    public class EffortCountsModel
    {
        public string Overall { get; set; }
        public string Female { get; set; }
    }
}
