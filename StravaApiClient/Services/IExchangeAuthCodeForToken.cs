using SegmentSniper.Models.Models.Auth;
using SegmentSniper.Models.Models.Strava.Token;

namespace StravaApiClient.Services
{
    public interface IExchangeAuthCodeForToken
    {
        Task<ExchangeAuthCodeForTokenContract.Result> ExecuteAsync(ExchangeAuthCodeForTokenContract contract);

        public class ExchangeAuthCodeForTokenContract
        {
            public string AuthCode { get; set; }

            public class Result
            {
                public Result(StravaApiTokenModel stravaToken)
                {
                    StravaToken = stravaToken;
                }
                public StravaApiTokenModel StravaToken { get; set; }
            }
        }
    }
}