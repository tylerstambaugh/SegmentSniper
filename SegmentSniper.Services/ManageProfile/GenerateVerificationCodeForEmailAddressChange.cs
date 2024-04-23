using SegmentSniper.Data;
using SegmentSniper.Data.Entities.ManageProfile;

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
                    var existingCodes = _segmentSniperDbContext.ChangeEmailVerificationCodes
                        .Where(c => c.UserId == contract.UserId)
                        .ToList();

                    _segmentSniperDbContext.ChangeEmailVerificationCodes.RemoveRange(existingCodes);

                    _segmentSniperDbContext.SaveChanges();

                    Random random = new Random();
                    var verificationCode = random.Next(100000, 999999);

                    code.VerificationCode = verificationCode;
                    code.ExpirationDate = DateTime.UtcNow.AddMinutes(60);
                    code.UserId = contract.UserId;

                    _segmentSniperDbContext.ChangeEmailVerificationCodes.Add(code);
                    var saveResult = _segmentSniperDbContext.SaveChanges();

                    if (saveResult == 1)
                    {
                        return new GenerateVerificationCodeForEmailAddressChangeContract.Result
                        {
                            CodeSaved = true,
                            Code = code.VerificationCode,
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
                else
                {
                    throw new ApplicationException($"User not found. User ID: {contract.UserId}");
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
