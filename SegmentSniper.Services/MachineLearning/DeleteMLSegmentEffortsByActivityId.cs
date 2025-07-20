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

            var segmentsToDelete = _segmentSniperDbContext.ML_SegmentEfforts.Where(e => contract.SegmentEffortIds.Contains(e.SegmentEffortId);

            _segmentSniperDbContext.ML_SegmentEfforts.RemoveRange(segmentsToDelete);

            _segmentSniperDbContext.SaveChanges();

            return new DeleteMLSegmentEffortsByIdContract.Result();
        }       
    }
}
