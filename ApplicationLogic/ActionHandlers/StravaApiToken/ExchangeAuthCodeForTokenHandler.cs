using SegmentSniper.Data;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient.Services;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public class ExchangeAuthCodeForTokenHandler : IExchangeAuthCodeForTokenHandler
    {
        private readonly ISegmentSniperDbContext _context;
        private readonly IExchangeAuthCodeForToken _exchangeAuthCodeForToken;
        private readonly IAddStravaToken _addStravaToken;

        public ExchangeAuthCodeForTokenHandler(ISegmentSniperDbContext context, IExchangeAuthCodeForToken exchangeAuthCodeForToken, IAddStravaToken addStravaToken)
        {
            _context = context;
            _exchangeAuthCodeForToken = exchangeAuthCodeForToken;
            _addStravaToken = addStravaToken;
        }

        public async Task<ExchangeAuthCodeForTokenRequest.Response> Execute(ExchangeAuthCodeForTokenRequest request)
        {
            ValidateRequest(request);
            bool tokenWasAdded = false;

            var tokenData = await _exchangeAuthCodeForToken.ExecuteAsync(new ExchangeAuthCodeForTokenContract { AuthCode = request.AuthCode });


            if (tokenData != null)
            {
                var result = await _addStravaToken.ExecuteAsync(new AddStravaTokenContract(request.UserId, tokenData.StravaToken));
                tokenWasAdded = result.Success;
            }

            return new ExchangeAuthCodeForTokenRequest.Response { TokenWasAdded = tokenWasAdded };
        }

        public void ValidateRequest(ExchangeAuthCodeForTokenRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (String.IsNullOrWhiteSpace(request.AuthCode))
            {
                throw new ArgumentNullException(nameof(request.Scopes));
            }

            if (String.IsNullOrWhiteSpace(request.Scopes))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }

            if (String.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentNullException(nameof(request.UserId));
            }

            if (_context.StravaAthleteInfo.Where(u => u.AuthUserId == request.UserId) == null)
            {
                throw new ArgumentException($"User {request.UserId} not found", nameof(request.UserId));
            }
        }
    }
}
