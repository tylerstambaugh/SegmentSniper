using AutoMapper;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.Services.MachineLearning
{
    public class SaveSegmentPredictionModel : ISaveSegmentPredictionModel
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public SaveSegmentPredictionModel(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<SaveSegmentPredictionModelContract.Result> ExecuteAsync(SaveSegmentPredictionModelContract contract)
        {
            var modelToSave = _mapper.Map<SegmentPredictionTrainingData, ML_SegmentPredictionModel>(contract.SegmentPredictionTrainingData);

            _segmentSniperDbContext.ML_SegmentPredictionModels.Add(modelToSave);

            return new SaveSegmentPredictionModelContract.Result
            {
                Success = await _segmentSniperDbContext.SaveChangesAsync() == 1
            };
        }
    }
}
