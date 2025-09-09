using SegmentSniper.Models.Garage;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Garage;

public interface IGetBikesByUserIdActionHandler
{
    Task<GetBikesByUserIdRequest.Response> ExecuteAsync(GetBikesByUserIdRequest request);
}

public class GetBikesByUserIdRequest
{
    public GetBikesByUserIdRequest(string userId)
    {
        UserId = userId;
    }

    public string UserId { get; set; }

    public class Response
    {
        public Response(List<BikeModel> bikes) => Bikes = bikes;

        public List<BikeModel> Bikes { get; init; }
    }
}