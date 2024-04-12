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
        }

        private void ValidateContract(VerifyCodeForEmailAddressChangeContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
