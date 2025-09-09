using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Models.MachineLearning;

namespace SegmentSniper.Services.MachineLearning
{
    public class GetSegmentPredictionModel : IGetSegmentPredictionModel
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public GetSegmentPredictionModel(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<GetSegmentPredictionModelContract.Result> ExecuteAsync(GetSegmentPredictionModelContract contract)
        {
            var user = await _segmentSniperDbContext.Users.FirstOrDefaultAsync(u => u.AuthUserId == contract.UserId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var userSegmentPredictionModel = _segmentSniperDbContext.ML_SegmentPredictionModels
                .Where(t => t.AuthUserId == contract.UserId)
                                  .Select(s => new
                                  {
                                      s.Id,
                                      s.AuthUserId,
                                      s.CreatedDate,
                                      s.UpdatedDate,
                                      s.SegmentPredictionModelData
                                  })
                .FirstOrDefault();


            if (userSegmentPredictionModel != null)
            {
                return new GetSegmentPredictionModelContract.Result
                {
                    SegmentPredictionTrainingData = new SegmentPredictionTrainedData
                    {
                        Id = userSegmentPredictionModel.Id,
                        CreatedDate = userSegmentPredictionModel.CreatedDate,
                        UpdatedDate = userSegmentPredictionModel.UpdatedDate,
                        SegmentPredictionModelData = userSegmentPredictionModel.SegmentPredictionModelData
                    }
                };
            }
            else
            {
                return new GetSegmentPredictionModelContract.Result
                {
                    SegmentPredictionTrainingData = new SegmentPredictionTrainedData()
                };
            }
        }
    }
}
