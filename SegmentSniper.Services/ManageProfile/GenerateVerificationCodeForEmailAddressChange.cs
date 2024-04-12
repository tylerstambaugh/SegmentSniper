using SegmentSniper.Data;
using SegmentSniper.Models.Models.ManageProfile;
using System;

namespace SegmentSniper.Services.ManageProfile
{
    public class GenerateVerificationCodeForEmailAddressChange : IGenerateVerificationCodeForEmailAddressChange
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GenerateVerificationCodeForEmailAddressChange(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GenerateVerificationCodeForEmailAddressChangeContract.Result> ExecuteAsync(GenerateVerificationCodeForEmailAddressChangeContract contract)
        {
            ValidateContract(contract);

            try
            {
                var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();

                if (user != null)
                {
                    Random random = new Random();
                    var verificationCode = random.Next(100000, 999999);

                    user.EmailChangeVerificationCode = verificationCode;
                }

                _segmentSniperDbContext.Users.Update(user);

                return new GenerateVerificationCodeForEmailAddressChangeContract.Result
                {
                    CodeSaved = true,
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error updating email address", ex);
            }
        }

        private void ValidateContract(GenerateVerificationCodeForEmailAddressChangeContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrWhiteSpace(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }

            if (_segmentSniperDbContext.Users.Count(u => u.Id == contract.UserId) == 0)
            {
                throw new ApplicationException("User does not exist");
            }
        }
    }
}
