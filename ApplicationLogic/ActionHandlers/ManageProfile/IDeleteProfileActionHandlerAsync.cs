namespace SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile
{
    public interface IDeleteProfileActionHandlerAsync
    {
        Task<DeleteProfileAsyncRequest.Response> HandleAsync(DeleteProfileAsyncRequest request);
    }

    public class DeleteProfileAsyncRequest
    {
        public DeleteProfileAsyncRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Response
        {
            public Response(bool success)
            {
                Success = success;
            }

            public bool Success { get; set; }
        }
    }
}