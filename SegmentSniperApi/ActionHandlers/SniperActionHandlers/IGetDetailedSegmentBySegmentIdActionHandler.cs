using SegmentSniper.Models.UIModels.Segment;
using StravaApiClient.Services.Segment;
using System.Security.Policy;

namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetDetailedSegmentBySegmentIdActionHandler
    {
        Task<GetDetailedSegmentBySegmentIdRequest.Response> HandleAsync(GetDetailedSegmentBySegmentIdRequest request);
    }

    public class GetDetailedSegmentBySegmentIdRequest
    {
        public GetDetailedSegmentBySegmentIdRequest()
        {
            
        }
        public GetDetailedSegmentBySegmentIdRequest(string userId, string segmentId)
        {
            UserId = userId;
            SegmentId = segmentId;
        }

        public string UserId { get; set; }
        public string SegmentId { get; set; }


        public class Response
        {
            public DetailedSegmentUIModel DetailedSegmentUIModel { get; set; }
        }
    }

}