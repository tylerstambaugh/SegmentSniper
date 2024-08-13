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
    }
}
