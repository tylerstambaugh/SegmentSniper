namespace SegmentSniper.Api.ActionHandlers;
public class ApiResponse<T>
{
    public int StatusCode { get; set; }
    public T Data { get; set; }
    public string ErrorMessage { get; set; }

    public ApiResponse(int statusCode, T data, string errorMessage = null)
    {
        StatusCode = statusCode;
        Data = data;
        ErrorMessage = errorMessage;
    }
}
