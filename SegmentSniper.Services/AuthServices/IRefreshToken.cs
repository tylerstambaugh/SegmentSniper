using IdentityModel.Client;
using SegmentSniper.Models.Models.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public interface IRefreshToken
    {
        Task<RefreshTokenContract.Result> Execute(RefreshTokenContract contract);

        public class RefreshTokenContract
        {
            public RefreshTokenContract(TokenModel tokenToRefresh)
            {
                TokenToRefresh = tokenToRefresh;
            }
            public TokenModel TokenToRefresh { get; set; }

            public class Result
            {
                public TokenModel RefreshedToken { get; set;}
            }
        }
    }
}