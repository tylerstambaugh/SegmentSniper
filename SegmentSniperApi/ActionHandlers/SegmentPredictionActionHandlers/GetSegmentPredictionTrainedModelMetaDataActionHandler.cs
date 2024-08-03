using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.MachineLearning;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.UIModels.MachineLearning;

namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public class GetSegmentPredictionTrainedModelMetaDataActionHandler : IGetSegmentPredictionTrainedModelMetaDataActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly ISegmentPredictionDataProcessor _segmentPredictionDataProcessor;
        private readonly IMapper _mapper;

        public GetSegmentPredictionTrainedModelMetaDataActionHandler(ISegmentSniperDbContext context, ISegmentPredictionDataProcessor segmentPredictionDataProcessor,
            IMapper mapper)
        {
            _context = context;
            _segmentPredictionDataProcessor = segmentPredictionDataProcessor;
            _mapper = mapper;
        }

        public async Task<GetSegmentPredictionTrainingModelActionHandlerRequest.Result> HandleAsync(GetSegmentPredictionTrainingModelActionHandlerRequest request)
        {
            ValidateRequest(request);
            var trainingModel = await _segmentPredictionDataProcessor.GetSegmentPredictionTrainedModelData(request.UserId);

            var returnModel = _mapper.Map<SegmentPredictionTrainingData, SegmentPredictionTrainingDataUiModel>(trainingModel);

            return new GetSegmentPredictionTrainingModelActionHandlerRequest.Result()
            {
                SegmentPredictionTrainingDataUiModel = returnModel,
            };            
        }

        private void ValidateRequest(GetSegmentPredictionTrainingModelActionHandlerRequest request)
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
