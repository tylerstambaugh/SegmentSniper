namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IDeleteProfileActionHandler
    {
        Task<DeleteProfileRequest.Response> HandleAsync(DeleteProfileRequest request);
    }

    public class DeleteProfileRequest
    {
        public DeleteProfileRequest(string userId)
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