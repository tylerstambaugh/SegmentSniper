using StravaApiClient.Configuration;

namespace SegmentSniper.Api.Configuration
{
    public class StravaRequestClientConfiguration : IStravaRequestClientConfiguration
    {
        private readonly IConfiguration _appConfig;
        private readonly StravaApiSettings _stravaApiSettings;
        

        public StravaRequestClientConfiguration(IConfiguration appConfig) 
        {
            _appConfig = appConfig;

            _stravaApiSettings = _appConfig.GetSection("StravaApiSettings").Get<StravaApiSettings>();
        }


        string IStravaRequestClientConfiguration.ClientId => _appConfig["StravaApiSettings-ClientId"];
        string IStravaRequestClientConfiguration.ClientSecret => _appConfig["StravaApiSettings-ClientSecret"];
        string IStravaRequestClientConfiguration.BaseUrl => _stravaApiSettings.BaseUrl;
        string IStravaRequestClientConfiguration.OauthBaseUrl => _stravaApiSettings.OAuthBaseUrl;
        string IStravaRequestClientConfiguration.RefreshToken { get; set; }
        string IStravaRequestClientConfiguration.UserId { get; set; }
    }

    public class StravaApiSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string BaseUrl { get; set; }
        public string OAuthBaseUrl { get; set; }

    }
}
