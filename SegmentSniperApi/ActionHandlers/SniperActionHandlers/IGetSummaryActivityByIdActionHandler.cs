namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummaryActivityByIdActionHandler
    {
        Task<GetSummaryActivityByIdRequest.Response> Handle(GetSummaryActivityByIdRequest request);
    }

    public class GetSummaryActivityByIdRequest
    {

        public class Response
        {

        }
    }
}