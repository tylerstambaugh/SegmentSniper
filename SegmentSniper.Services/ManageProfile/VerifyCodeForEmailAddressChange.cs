using SegmentSniper.Data;

namespace SegmentSniper.Services.ManageProfile
{
    public class VerifyCodeForEmailAddressChange : IVerifyCodeForEmailAddressChange
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public VerifyCodeForEmailAddressChange(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public VerifyCodeForEmailAddressChangeContract.Result Execute(VerifyCodeForEmailAddressChangeContract contract)
        {
            ValidateContract(contract);
            var result = new VerifyCodeForEmailAddressChangeContract.Result
            {
                CorrectCode = false
            };

            try
            {
                var codeToCompare = _segmentSniperDbContext.ChangeEmailVerificationCodes.Where(c => c.UserId == contract.UserId).FirstOrDefault();
                if (codeToCompare?.ExpirationDate > DateTime.UtcNow)
                {
                    throw new ArgumentException("Verification code expired. Please try again");
                }

                if (codeToCompare?.VerificationCode == contract.VerificationCode && codeToCompare.ExpirationDate < DateTime.UtcNow)
                {
                    result.CorrectCode = true;
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error verifying change email verification code", ex);
            }
        }

        private void ValidateContract(VerifyCodeForEmailAddressChangeContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
