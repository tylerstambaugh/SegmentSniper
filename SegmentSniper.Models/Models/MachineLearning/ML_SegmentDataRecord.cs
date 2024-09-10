using Microsoft.ML.Data;

namespace SegmentSniper.Models.MachineLearning
{
    public class ML_SegmentDataRecord
    {
        [LoadColumn(1)]
        public float Distance { get; set; }
        [LoadColumn(2)]
        public float ElevationGain { get; set; }
        [LoadColumn(3)]
        public float AverageGrade { get; set; }
        [LoadColumn(4)]
        public float MaximumGrade { get; set; }
        [LoadColumn(5)]
        [ColumnName("SegmentPrTime")]
        public float SegmentPrTime { get; set; }
       // public float Label { get; set; }
    }
}
