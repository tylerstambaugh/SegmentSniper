namespace SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers
{
    public interface IDeleteProfileActionHandler
    {
        Task<DeleteProfileRequest.Response> HandleAsync(DeleteProfileRequest request);
    }

    public class DeleteProfileRequest
    {

        public string UserId { get; set; }
        public class Response
        {
            public bool Success { get; set; }
        }
    }
}