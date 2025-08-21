using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.StravaTokenServices
{
    public class AddUser : IExecutableServiceAsync<AddUserContract, AddUserContract.Result>, IAddUser
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public AddUser(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<AddUserContract.Result> ExecuteAsync(AddUserContract contract)
        {
            ValidateContract(contract);
            try
            {
                var existingUser = await _segmentSniperDbContext.Users
                    .FirstOrDefaultAsync(a => a.StravaAthleteId == contract.StravaAthleteId);
                if (existingUser != null)
                {
                    return new AddUserContract.Result(false, "Athlete already exists.");
                }
                var newUser = new SegmentSniper.Data.Entities.User.User // Fully qualify the User type to avoid ambiguity with the namespace
                {
                    AuthUserId = contract.UserId,
                    StravaAthleteId = contract.StravaAthleteId
                };

                _segmentSniperDbContext.Users.Add(newUser);
                var result = await _segmentSniperDbContext.SaveChangesAsync() == 1;
                return new AddUserContract.Result(result);


            }
            catch (Exception ex)
            {
                return new AddUserContract.Result(false, $"Error adding athlete: {ex.Message}");
            }
        }
        private void ValidateContract(AddUserContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
