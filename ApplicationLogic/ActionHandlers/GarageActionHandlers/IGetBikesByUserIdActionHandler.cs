using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.GarageActionHandlers
{
    public interface IGetBikesByUserIdActionHandler
    {
        Task<GetBikesByUserIdRequest.Response> ExecuteAsync(GetBikesByUserIdRequest request);
    }

    public class GetBikesByUserIdRequest
    {
        public string UserId { get; set; }
        public class Response
        {
            public Response(List<BikeModel> bikes) => Bikes = bikes;

            public List<BikeModel> Bikes { get; init; }
        }
    }
}