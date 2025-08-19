using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class AddStravaAthlete : IExecutableServiceAsync<AddStravaAthleteContract, AddStravaAthleteContract.Result>, IAddStravaAthlete
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddStravaAthlete(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddStravaAthleteContract.Result> ExecuteAsync(AddStravaAthleteContract contract)
        {
            ValidateContract(contract);
            try
            {
                var existingAthlete = await _segmentSniperDbContext.StravaAthleteInfo
                    .FirstOrDefaultAsync(a => a.StravaAthleteId == contract.StravaAthlete.Id.ToString());
                if (existingAthlete != null)
                {
                    return new AddStravaAthleteContract.Result(false, "Athlete already exists.");
                }
                var newAthlete = new Data.Entities.StravaToken.StravaAthleteInfo
                {
                    AuthUserId = contract.UserId,
                    StravaAthleteId = contract.StravaAthlete.Id.ToString(),
                };


            }
            catch (Exception ex)
            {
                return new AddStravaAthleteContract.Result(false, $"Error adding athlete: {ex.Message}");
            }
        }
        private void ValidateContract(AddStravaAthleteContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
