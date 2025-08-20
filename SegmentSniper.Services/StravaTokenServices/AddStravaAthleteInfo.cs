using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class AddStravaAthleteInfo : IExecutableServiceAsync<AddStravaAthleteContract, AddStravaAthleteContract.Result>, IAddStravaAthlete
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddStravaAthleteInfo(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddStravaAthleteContract.Result> ExecuteAsync(AddStravaAthleteContract contract)
        {
            ValidateContract(contract);
            try
            {
                var existingAthlete = await _segmentSniperDbContext.StravaAthleteInfo
                    .FirstOrDefaultAsync(a => a.StravaAthleteId == contract.StravaAthleteId);
                if (existingAthlete != null)
                {
                    return new AddStravaAthleteContract.Result(false, "Athlete already exists.");
                }
                var newAthlete = new Data.Entities.StravaToken.User
                {
                    AuthUserId = contract.UserId,
                    StravaAthleteId = contract.StravaAthleteId
                };

                _segmentSniperDbContext.StravaAthleteInfo.Add(newAthlete);
                var result = await _segmentSniperDbContext.SaveChangesAsync() == 1;
                return new AddStravaAthleteContract.Result(result);


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
