using IdentityModel.Client;
using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public interface IRefreshToken
    {
        Task<RefreshTokenContract.Result> Execute(RefreshTokenContract contract);

        public class RefreshTokenContract
        {
            public RefreshTokenContract(SegmentSniperTokenData tokenToRefresh)
            {
                TokenToRefresh = tokenToRefresh;
            }
            public SegmentSniperTokenData TokenToRefresh { get; set; }

            public class Result
            {
                public SegmentSniperTokenData RefreshedToken { get; set;}
            }
        }
    }
}