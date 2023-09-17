namespace SegmentSniper.Api.ActionHandlers.SniperActionHandlers
{
    public interface IGetSummaryActivityForTimeRangeActionHandler
    {
        GetSummaryActivityForTimeRangeRequest.Response Handle(GetSummaryActivityForTimeRangeRequest request);
    }

    public class GetSummaryActivityForTimeRangeRequest
    {
        public GetSummaryActivityForTimeRangeRequest()
        {
            
        }

        public class Response
        {
            public Response()
            {
                
            }
        }
    }
}