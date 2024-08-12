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
            try
            {

                var modelToSave = _mapper.Map<SegmentPredictionTrainingData, ML_SegmentPredictionModel>(contract.SegmentPredictionTrainingData);

                var existingModel = _segmentSniperDbContext.ML_SegmentPredictionModels
                    .Where(m => m.UserId == contract.SegmentPredictionTrainingData.UserId)
                    .FirstOrDefault();

                if (existingModel is not null)
                {
                    existingModel.SegmentPredictionModelData = contract.SegmentPredictionTrainingData.SegmentPredictionModelData;
                    existingModel.UpdatedDate = DateTime.Now;

                    _segmentSniperDbContext.ML_SegmentPredictionModels.Update(existingModel);
                }
                else
                {
                    modelToSave.Id = Guid.NewGuid().ToString();
                    _segmentSniperDbContext.ML_SegmentPredictionModels.Add(modelToSave);
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error saving trained model", ex);
            }

            return new SaveSegmentPredictionModelContract.Result
            {
                Success = await _segmentSniperDbContext.SaveChangesAsync() == 1
            };
        }
    }
}
