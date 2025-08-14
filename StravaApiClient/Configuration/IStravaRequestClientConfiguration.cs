namespace StravaApiClient.Configuration
{
    public interface IStravaRequestClientConfiguration
    {
        string ClientId { get; }
        string ClientSecret { get; }
        string RefreshToken { get; set; }
        string BaseUrl { get; }
        string OauthBaseUrl { get; }
        string AuthUserId { get; set; }

    }
}

