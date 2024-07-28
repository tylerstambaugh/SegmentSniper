using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using Serilog;

namespace SegmentSniper.Services.MachineLearning
{
    public class SaveSegmentPredictionTrainingData : ISaveSegmentPredictionTrainingData
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public SaveSegmentPredictionTrainingData(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<SaveSegmentPredictionTrainingDataContract.Result> ExecuteAsync(SaveSegmentPredictionTrainingDataContract contract)
        {
            try
            {

                var existingIds = await _segmentSniperDbContext.ML_SegmentEfforts
                                                    .Select(e => e.StravaSegmentEffortId)
                                                    .ToListAsync();

                var newEntities = contract.MlSegmentEfforts.Where(e => !existingIds.Contains(e.StravaSegmentEffortId)).ToList();

                if (newEntities.Any())
                {
                    _segmentSniperDbContext.ML_SegmentEfforts.AddRange(newEntities);
                    await _segmentSniperDbContext.SaveChangesAsync();
                }
                return new SaveSegmentPredictionTrainingDataContract.Result
                {
                    Success = true,
                };

            }
            catch (Exception ex)
            {
                Log.Debug($"Error saving segment effort training data: {ex.Message}");
                return new SaveSegmentPredictionTrainingDataContract.Result { Success = false};
            }


        }

        //private ML_SegmentEffort CreateMlSegmentEffort(DetailedSegmentEffort dse, DetailedSegment detailedSegment)
        //{
        //    return new ML_SegmentEffort
        //    {
        //        UserId = _userId,
        //        StravaSegmentEffortId = dse.SegmentEffortId,
        //        StravaSegmentId = detailedSegment.SegmentId,
        //        SegmentName = detailedSegment.Name,
        //        ElapsedTime = dse.ElapsedTime,
        //        SegmentPrTime = detailedSegment.AthleteSegmentStats.PrElapsedTime,
        //        Distance = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2),
        //        AverageSpeed = Math.Round(CommonConversionHelpers.ConvertMetersToMiles(detailedSegment.Distance), 2) / (dse.ElapsedTime * 60 * 60),
        //        ElevationGain = detailedSegment.TotalElevationGain,
        //        AverageGrade = detailedSegment.AverageGrade,
        //        MaximumGrade = detailedSegment.MaximumGrade,
        //        AverageHeartRate = dse.AverageHeartrate,
        //        KomTime = GetTimeFromString(detailedSegment.Xoms.Kom),
        //        QomTime = GetTimeFromString(detailedSegment.Xoms.Qom),
        //        AthleteCount = detailedSegment.AthleteCount,
        //        EffortCount = detailedSegment.EffortCount,
        //        StarCount = detailedSegment.StarCount,
        //        PrRank = dse.PrRank,
        //    };
        //}
    }
}
