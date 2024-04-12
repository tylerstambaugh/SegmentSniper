using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IVerifyCodeForEmailAddressChange : IExecutableService<VerifyCodeForEmailAddressChangeContract, VerifyCodeForEmailAddressChangeContract.Result>
    {
        VerifyCodeForEmailAddressChangeContract.Result Execute(VerifyCodeForEmailAddressChangeContract contract);
    }

    public class VerifyCodeForEmailAddressChangeContract
    {
        public class Result
        {
        }
    }
}