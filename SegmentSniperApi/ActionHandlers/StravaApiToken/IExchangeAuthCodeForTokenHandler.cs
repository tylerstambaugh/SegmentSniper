namespace SegmentSniper.Api.ActionHandlers.StravaApiToken
{
    public interface IExchangeAuthCodeForTokenHandler
    {
        Task<ExchangeAuthCodeForTokenContract.Result> Execute(ExchangeAuthCodeForTokenContract contract);
    }
}