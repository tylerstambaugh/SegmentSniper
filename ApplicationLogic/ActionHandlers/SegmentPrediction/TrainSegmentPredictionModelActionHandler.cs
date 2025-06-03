
using AutoMapper;
using SegmentSniper.MachineLearning;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.UIModels.MachineLearning;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction
{
    public class TrainSegmentPredictionModelActionHandler : ITrainSegmentPredictionModelActionHandler
    {
        private readonly ISegmentPredictionDataProcessor _segmentPredictionDataProcessor;
        private readonly IMapper _mapper;

        public TrainSegmentPredictionModelActionHandler(ISegmentPredictionDataProcessor segmentPredictionDataProcessor, IMapper mapper)
        {
            _segmentPredictionDataProcessor = segmentPredictionDataProcessor;
            _mapper = mapper;
        }

        public async Task<TrainModelRequest.Response> HandleAsync(TrainModelRequest request)
        {
            ValidateRequest(request);

            // can evaluate if trained model exists and determine whether to use it or train a new model?
            var hasTrainedModel = await _segmentPredictionDataProcessor.GetSegmentPredictionTrainedModelData(request.UserId);

            if (hasTrainedModel.NumberOfSegmentsUsedInModelTraining > 0)
            {
                try
                {

                    await _segmentPredictionDataProcessor.TrainModel(request.UserId);

                    var trainedModelMetaData = await _segmentPredictionDataProcessor.GetSegmentPredictionTrainedModelData(request.UserId);

                    var returnModel = _mapper.Map<SegmentPredictionTrainedData, SegmentPredictionTrainingDataUiModel>(trainedModelMetaData);

                    return new TrainModelRequest.Response(returnModel);
                }
                catch (Exception ex)
                {
                    throw new ApplicationException("Error training segment prediction model", ex);
                }

            }
            else
            {
                throw new ApplicationException("There are no segments saved to use in training. Use the segment sniper to build up some training data.");
            }
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
