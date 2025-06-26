using SegmentSniper.Models.Models.Strava.Token;
using StravaApiClient.Models.Token;

namespace StravaApiClient.Services
{
    public interface IExchangeAuthCodeForToken
    {
        Task<ExchangeAuthCodeForTokenContract.Result> ExecuteAsync(ExchangeAuthCodeForTokenContract contract);

    }
    public class ExchangeAuthCodeForTokenContract
    {
        public string AuthCode { get; set; }

        public class Result
        {
            public Result(StravaTokenModel stravaToken)
            {
                StravaToken = stravaToken;
            }
            public StravaTokenModel StravaToken { get; set; }
        }
    }
}