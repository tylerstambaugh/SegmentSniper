using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IVerifyCodeForEmailAddressChange : IExecutableService<VerifyCodeForEmailAddressChangeContract, VerifyCodeForEmailAddressChangeContract.Result>
    {
        VerifyCodeForEmailAddressChangeContract.Result Execute(VerifyCodeForEmailAddressChangeContract contract);
    }

    public class VerifyCodeForEmailAddressChangeContract
    {
        public VerifyCodeForEmailAddressChangeContract(string userId, int verificationCode)
        {
            UserId = userId;
            VerificationCode = verificationCode;
        }

        public string UserId { get; set; }
        public int VerificationCode { get; set; }
        public class Result
        {
            public bool CorrectCode { get; set; }
        }
    }
}