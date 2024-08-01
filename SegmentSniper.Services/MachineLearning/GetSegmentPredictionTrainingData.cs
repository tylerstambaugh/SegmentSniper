using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Models.MachineLearning;
using System.Diagnostics.Contracts;

namespace SegmentSniper.Services.MachineLearning
{
    public class GetSegmentPredictionTrainingData : IGetSegmentPredictionTrainingData
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public GetSegmentPredictionTrainingData(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<GetSegmentPredictionTrainingDataContract.Result> ExecuteAsync(GetSegmentPredictionTrainingDataContract contract)
        {
            var user = await _segmentSniperDbContext.Users.FirstOrDefaultAsync(u => u.Id == contract.UserId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var segmentEfforts = await _segmentSniperDbContext.ML_SegmentEfforts
                .Where(e => e.UserId == contract.UserId)
                .ToListAsync();

            var segmentDataRecords = segmentEfforts
                .Select(e => _mapper.Map<ML_SegmentEffort, ML_SegmentDataRecord>(e))
                .ToList();

            return new GetSegmentPredictionTrainingDataContract.Result
            {
                ML_SegmentDataRecords = segmentDataRecords
            };
        }

        public async Task<int> GetCountOfTrainingRecords(string userId)
        {
            int segmentEffortCount = await _segmentSniperDbContext.ML_SegmentEfforts
                .Where(e => e.UserId == userId)
                .CountAsync();

            return segmentEffortCount;
        }

    }
}
