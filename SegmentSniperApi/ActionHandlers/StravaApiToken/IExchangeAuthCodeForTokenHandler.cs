namespace SegmentSniper.Api.ActionHandlers.StravaApiToken
{
    public interface IExchangeAuthCodeForTokenHandler
    {
        Task<ExchangeAuthCodeForTokenRequest.Response> Execute(ExchangeAuthCodeForTokenRequest contract);


    }
    public class ExchangeAuthCodeForTokenRequest
    {
        public string UserId { get; set; }
        public string AuthCode { get; set; }
        public string Scopes { get; set; }

        public class Response
        {
            public bool TokenWasAdded { get; set; }
        }
    }

    public class ClientIdResponse
    {
        public string ClientId { get; set; }
    }
}