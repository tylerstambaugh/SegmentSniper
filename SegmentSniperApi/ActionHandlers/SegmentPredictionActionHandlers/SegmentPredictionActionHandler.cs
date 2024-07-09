namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public class SegmentPredictionActionHandler : ISegmentPredictionActionHandler
    {

        public SegmentPredictionActionHandler()
        {
            
        }

        public async Task<SegmentPredictionRequest.Response> HandleAsync(SegmentPredictionRequest request)
        {
            return new SegmentPredictionRequest.Response
            {
                PredictedTime = 123
            };

        }
    }
}
