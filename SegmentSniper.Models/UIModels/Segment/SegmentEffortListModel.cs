using SegmentSniper.Models.Models.Strava.Misc;
using SegmentSniper.Models.Models.Strava.Segment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SegmentSniper.Models.UIModels.Segment
{
    public  class SegmentEffortListModel
    {
        public long SegmentEffortId { get; set; }
        public long SegmentId { get; set; }
        public string ActivityId { get; set; }
        public string Name { get; set; }
        public string Time { get; set; }
        public string ActivityType { get; set; }
        public double Distance { get; set; }
        public DateTime CreatedAt { get; set; }
        public MapModel Map { get; set; }
        public int EffortCount { get; set; }
        public int AthleteCount { get; set; }
        public int StarCount { get; set; }
        public bool Starred { get; set; }
        public AthleteSegmentStats AthleteSegmentStats { get; set; }
        public Xoms Xoms { get; set; }
        public int Rank { get; set; }
    }
}
