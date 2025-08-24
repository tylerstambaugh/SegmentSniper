using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                var modelToSave = _mapper.Map<SegmentPredictionTrainedData, ML_SegmentPredictionModel>(contract.SegmentPredictionTrainingData);

                var existingModel = await _segmentSniperDbContext.ML_SegmentPredictionModels
                    .Where(m => m.AuthUserId == contract.SegmentPredictionTrainingData.AuthUserId)
                    .FirstOrDefaultAsync();

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

                var result = _segmentSniperDbContext.SaveChanges() == 1;

                return new SaveSegmentPredictionModelContract.Result
                {
                    Success = result
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error saving trained model", ex);
            }

           
        }
    }
}
