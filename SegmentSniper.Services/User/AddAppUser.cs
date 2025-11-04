using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.User;
using SegmentSniper.Services.Interface;
using SegmentSniper.Services.User;

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
                    .FirstOrDefaultAsync(a => a.AuthUserId == contract.UserId);
                if (existingUser != null)
                {
                    return new AddAppUserContract.Result(false, "User already exists.");
                }
                var newUser = new AppUser
                {
                    AuthUserId = contract.UserId,
                    EmailAddress = contract.EmailAddress
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
            if(contract == null)
            {
                throw new ArgumentNullException(nameof(contract));

            }
            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
        }
    }
}
