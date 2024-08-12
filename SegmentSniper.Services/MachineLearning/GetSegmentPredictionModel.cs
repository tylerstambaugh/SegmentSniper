using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Segments;
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
            var user = await _segmentSniperDbContext.Users.FirstOrDefaultAsync(u => u.Id == contract.UserId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var userSegmentPredictionModel = _segmentSniperDbContext.ML_SegmentPredictionModels
                .Where(t => t.UserId == contract.UserId)
                                  .Select(s => new
                                  {
                                      s.Id,
                                      s.UserId,
                                      s.CreatedDate,
                                      s.UpdatedDate
                                  })
                .FirstOrDefault();


            if (userSegmentPredictionModel != null)
            {
                return new GetSegmentPredictionModelContract.Result
                {
                    SegmentPredictionTrainingData = new SegmentPredictionTrainingData
                    {
                        Id = userSegmentPredictionModel.Id,
                        CreatedDate = userSegmentPredictionModel.CreatedDate,
                        UpdatedDate = userSegmentPredictionModel.UpdatedDate,
                    }
                };
            }
            else
            {
                return new GetSegmentPredictionModelContract.Result
                {
                    SegmentPredictionTrainingData = new SegmentPredictionTrainingData()
                };
            }
        }
    }
}
