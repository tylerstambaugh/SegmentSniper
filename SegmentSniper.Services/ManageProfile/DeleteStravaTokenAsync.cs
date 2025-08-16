using SegmentSniper.Data;

namespace SegmentSniper.Services.ManageProfile
{
    public class DeleteStravaTokenAsync : IDeleteStravaTokenAsync
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public DeleteStravaTokenAsync(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<DeleteStravaTokenContract.Result> ExecuteAsync(DeleteStravaTokenContract contract)
        {
            ValidateContract(contract);

            try
            {

                var stravaToken = _segmentSniperDbContext.StravaAthleteInfo.Where(x => x.AuthUserId == contract.UserId).FirstOrDefault();

                if (stravaToken != null)
                {
                    _segmentSniperDbContext.StravaAthleteInfo.Remove(stravaToken);
                    var numRows = _segmentSniperDbContext.SaveChanges();

                    return new DeleteStravaTokenContract.Result(numRows == 1);
                }
                else
                {
                    return new DeleteStravaTokenContract.Result(false);
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unable to delete Strava token", ex);
            }
        }

        private void ValidateContract(DeleteStravaTokenContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }

            if (_segmentSniperDbContext.StravaAthleteInfo.Count(u => u.AuthUserId == contract.UserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
