using SegmentSniper.Data;

namespace SegmentSniper.Services.MachineLearning
{
    public class GetSegmentPredictionTrainingData: IGetSegmentPredictionTrainingData
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetSegmentPredictionTrainingData(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetSegmentPredictionTrainingDataContract.Result> ExecuteAsync(GetSegmentPredictionTrainingDataContract contract)
        {
            var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();
        }
    }
}
