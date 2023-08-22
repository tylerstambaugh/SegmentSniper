using System.Security.Claims;

namespace SegmentSniper.Services.AuthServices
{
    public interface IGetPrincipalFromExpiredToken
    {
        GetPrincipalFromExpiredTokenContract.Result Execute(GetPrincipalFromExpiredTokenContract contract);

        public class GetPrincipalFromExpiredTokenContract
        {
            public GetPrincipalFromExpiredTokenContract(string accessToken)
            {
                AccessToken = accessToken;
            }

            public string AccessToken { get; }

            public class Result
            {
                public Result(ClaimsPrincipal principal)
                {
                    Principal = principal;
                }
                public ClaimsPrincipal Principal { get; }
            }
        }
    }
}