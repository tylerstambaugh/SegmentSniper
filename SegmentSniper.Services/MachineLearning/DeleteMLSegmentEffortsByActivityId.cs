using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.MachineLearning
{
    public class DeleteMLSegmentEffortsById : IDeleteMLSegmentEffortsById, IExecutableServiceAsync<DeleteMLSegmentEffortsByIdContract, DeleteMLSegmentEffortsByIdContract.Result>
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteMLSegmentEffortsById(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteMLSegmentEffortsByIdContract.Result> ExecuteAsync(DeleteMLSegmentEffortsByIdContract contract)
        {
            try
            {
                var segmentsToDelete = await _segmentSniperDbContext.ML_SegmentEfforts
                    .Where(e => contract.SegmentEffortIds.Contains(e.StravaSegmentEffortId))
                    .ToListAsync();

                _segmentSniperDbContext.ML_SegmentEfforts.RemoveRange(segmentsToDelete);

                await _segmentSniperDbContext.SaveChangesAsync();

                return new DeleteMLSegmentEffortsByIdContract.Result
                {
                    Success = true,
                    Error = null
                };
            }
            catch (Exception ex)
            {
                return new DeleteMLSegmentEffortsByIdContract.Result
                {
                    Success = false,
                    Error = ex.Message
                };
            }
        }
    }
}
