using SegmentSniper.Services.StravaTokenServices;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken
{
    public class AddStravaAthleteActionHandler : IAddStravaAthleteActionHandler
    {
        private readonly IAddStravaAthlete _addStravaAthlete;

        public AddStravaAthleteActionHandler(IAddStravaAthlete addStravaAthlete)
        {
            _addStravaAthlete = addStravaAthlete;
        }

        public async Task<AddStravaAthleteRequest.Response> HandleAsync(AddStravaAthleteRequest request)
        {
            ValidateRequest(request);
            var result = await _addStravaAthlete.ExecuteAsync(new AddStravaAthleteContract(request.UserId, request.StravaAthlete));
            return new AddStravaAthleteRequest.Response(result.Success, result.Message);
        }

        private void ValidateRequest(AddStravaAthleteRequest request)
        {
            return;
        }

    }
}
