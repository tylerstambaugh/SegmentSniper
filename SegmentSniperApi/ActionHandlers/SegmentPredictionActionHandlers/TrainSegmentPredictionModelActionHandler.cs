
using SegmentSniper.MachineLearning;

namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public class TrainSegmentPredictionModelActionHandler : ITrainSegmentPredictionModelActionHandler
    {
        private readonly ISegmentPredictionDataProcessor _segmentPredictionDataProcessor;

        public TrainSegmentPredictionModelActionHandler(ISegmentPredictionDataProcessor segmentPredictionDataProcessor)
        {
            _segmentPredictionDataProcessor = segmentPredictionDataProcessor;
        }

        public async Task<TrainModelRequest.Response> HandleAsync(TrainModelRequest request)
        {
            ValidateRequest(request);

            var hasTrainedModel = await _segmentPredictionDataProcessor.GetSegmentPredictionTrainedModelData(request.UserId);
            if(hasTrainedModel is not null)
            {
                return new TrainModelRequest.Response(true);
            }
            var trainedModel = _segmentPredictionDataProcessor.TrainModel(request.UserId);


            return new TrainModelRequest.Response(true);
        }

        private void ValidateRequest(TrainModelRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException(nameof(request.UserId), "User Id cannot be empty");
            }
        }
    }
}
