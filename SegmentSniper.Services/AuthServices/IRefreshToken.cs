using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public interface IRefreshToken
    {
        Task<RefreshTokenContract.Result> Execute(RefreshTokenContract contract);

        public class RefreshTokenContract
        {
            public RefreshTokenContract(RefreshTokenData tokenToRefresh)
            {
                TokenToRefresh = tokenToRefresh;
            }
            public RefreshTokenData TokenToRefresh { get; set; }

            public class Result
            {
                public SegmentSniperTokenData RefreshedToken { get; set; }
            }
        }
    }
}