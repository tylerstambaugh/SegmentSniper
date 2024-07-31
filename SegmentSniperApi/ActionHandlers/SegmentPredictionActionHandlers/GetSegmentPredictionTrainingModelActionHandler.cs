using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.MachineLearning;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.UIModels.MachineLearning;

namespace SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers
{
    public class GetSegmentPredictionTrainingModelActionHandler : IGetSegmentPredictionTrainingModelActionHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly ISegmentPredictionDataProcessor _segmentPredictionDataProcessor;
        private readonly IMapper _mapper;

        public GetSegmentPredictionTrainingModelActionHandler(ISegmentSniperDbContext context, ISegmentPredictionDataProcessor segmentPredictionDataProcessor,
            IMapper mapper)
        {
            _context = context;
            _segmentPredictionDataProcessor = segmentPredictionDataProcessor;
            _mapper = mapper;
        }

        public async Task<GetSegmentPredictionTrainingModelActionHandlerRequest.Result> HandleAsync(GetSegmentPredictionTrainingModelActionHandlerRequest request)
        {
            var trainingModel = await _segmentPredictionDataProcessor.DoesUserHaveTrainedModel(request.UserId);

            var returnModel = _mapper.Map<SegmentPredictionTrainingData, SegmentPredictionTrainingDataUiModel>(trainingModel);

            return new GetSegmentPredictionTrainingModelActionHandlerRequest.Result()
            {
                SegmentPredictionTrainingDataUiModel = returnModel,
            };

            
        }
    }
}
