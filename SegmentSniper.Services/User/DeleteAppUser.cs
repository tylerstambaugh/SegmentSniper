using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.User
{
    public class DeleteAppUser : IExecutableServiceAsync<DeleteAppUserContract, DeleteAppUserContract.Result>, IDeleteAppUser
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteAppUser(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteAppUserContract.Result> ExecuteAsync(DeleteAppUserContract contract)
        {
            ValidateContract(contract);

            var user = await _segmentSniperDbContext.Users.Where(u => u.AuthUserId == contract.AuthUserId).FirstOrDefaultAsync();

            if (user == null)
            {
                return new DeleteAppUserContract.Result(false, "User not found");
            }
            else
            {
                var now = DateTime.UtcNow;

                await using var tx = await _segmentSniperDbContext.Database.BeginTransactionAsync();

                // Children first
                var affectedRows = 0;

                affectedRows += await _segmentSniperDbContext.ML_SegmentEfforts
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                affectedRows += await _segmentSniperDbContext.SegmentPredictionRegressionMetrics
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));


                affectedRows += await _segmentSniperDbContext.ML_SegmentPredictionModels
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                affectedRows += await _segmentSniperDbContext.Equipment
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                affectedRows += await _segmentSniperDbContext.BikeActivities
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                affectedRows += await _segmentSniperDbContext.Bikes
                    .Where(o => o.AuthUserId == user.AuthUserId)
                    .IgnoreQueryFilters()
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                //// Parent last
                affectedRows += await _segmentSniperDbContext.Users
                    .Where(u => u.AuthUserId == user.AuthUserId)
                    .ExecuteUpdateAsync(s => s
                        .SetProperty(e => e.DeletedDate, now)
                        .SetProperty(e => e.UpdatedDate, now));

                await tx.CommitAsync();
                return new DeleteAppUserContract.Result(affectedRows > 0);
            }
        }

        private void ValidateContract(DeleteAppUserContract contract)
        {
            if (contract == null)
                throw new ArgumentNullException(nameof(contract));

            if (string.IsNullOrEmpty(contract.AuthUserId))
            {
                throw new ArgumentNullException(nameof(contract.AuthUserId));
            }

        }
    }
}
