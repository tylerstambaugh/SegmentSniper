using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.User;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class AddAppUser : IExecutableServiceAsync<AddAppUserContract, AddAppUserContract.Result>, IAddAppUser
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddAppUser(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddAppUserContract.Result> ExecuteAsync(AddAppUserContract contract)
        {
            ValidateContract(contract);
            try
            {
                var existingUser = await _segmentSniperDbContext.Users
                    .FirstOrDefaultAsync(a => a.StravaAthleteId == contract.StravaAthleteId);
                if (existingUser != null)
                {
                    return new AddAppUserContract.Result(false, "Athlete already exists.");
                }
                var newUser = new AppUser
                {
                    AuthUserId = contract.UserId,
                    StravaAthleteId = contract.StravaAthleteId
                };

                _segmentSniperDbContext.Users.Add(newUser);
                var result = await _segmentSniperDbContext.SaveChangesAsync() == 1;
                return new AddAppUserContract.Result(result);


            }
            catch (Exception ex)
            {
                return new AddAppUserContract.Result(false, $"Error adding athlete: {ex.Message}");
            }
        }
        private void ValidateContract(AddAppUserContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
