using SegmentSniper.Services.StravaTokenServices;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public class AddStravaAthleteActionHandler : IAddStravaAthleteActionHandler
    {
        private readonly IAddUser _addStravaAthlete;

        public AddStravaAthleteActionHandler(IAddUser addStravaAthlete)
        {
            _addStravaAthlete = addStravaAthlete;
        }

        public async Task<AddStravaAthleteRequest.Response> HandleAsync(AddStravaAthleteRequest request)
        {
            ValidateRequest(request);
            var result = await _addStravaAthlete.ExecuteAsync(new AddUserContract(request.UserId, request.StravaAthlete));
            return new AddStravaAthleteRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(AddStravaAthleteRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request), "Request cannot be null.");
            }

            if (string.IsNullOrWhiteSpace(request.UserId))
            {
                throw new ArgumentException("UserId cannot be null or empty.", nameof(request.UserId));
            }
        }

    }
}
