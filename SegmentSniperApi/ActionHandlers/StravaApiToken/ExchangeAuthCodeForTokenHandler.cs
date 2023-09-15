using SegmentSniper.Data;
using static SegmentSniper.Api.ActionHandlers.StravaApiToken.IExchangeAuthCodeForTokenHandler;

namespace SegmentSniper.Api.ActionHandlers.StravaApiToken
{
    public class ExchangeAuthCodeForTokenHandler : IExchangeAuthCodeForTokenHandler
    {
        private readonly ISegmentSniperDbContext _context;

        public ExchangeAuthCodeForTokenHandler(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public async Task<ExchangeAuthCodeForTokenRequest.Response> Execute(ExchangeAuthCodeForTokenRequest request)
        {
            ValidateRequest(request);


            return new ExchangeAuthCodeForTokenRequest.Response
            {
                TokenWasAdded = false,
            };
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

            if (_context.Users.Where(u => u.Id == request.UserId) == null)
            {
                throw new ArgumentException($"User {request.UserId} not found", nameof(request.UserId));
            }
        }
    }
}
