using SegmentSniper.Data;
using SegmentSniper.Data.Entities.ManageProfile;
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
            ChangeEmailVerificationCode code = new ChangeEmailVerificationCode();
            try
            {
                var user = _segmentSniperDbContext.Users.Where(u => u.Id == contract.UserId).FirstOrDefault();

                if (user != null)
                {
                    Random random = new Random();
                    var verificationCode = random.Next(100000, 999999);

                   code.VerificationCode = verificationCode;
                   code.ExpirationDate = DateTime.UtcNow.AddMinutes(60);
                   code.UserId = contract.UserId;
                }

                _segmentSniperDbContext.ChangeEmailVerificationCode.Add(code);
                var saveResult = _segmentSniperDbContext.SaveChanges();

                if(saveResult == 1)
                {
                    return new GenerateVerificationCodeForEmailAddressChangeContract.Result
                    {
                        CodeSaved = true,
                    };
                }
                else
                {
                    return new GenerateVerificationCodeForEmailAddressChangeContract.Result
                    {
                        CodeSaved = false,
                    };
                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error generating change email verification code", ex);
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
