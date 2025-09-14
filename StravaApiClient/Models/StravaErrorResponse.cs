namespace StravaApiClient.Models
{
    public class StravaErrorResponse
    {
        public string Message { get; set; } = string.Empty;
        public string? Errors { get; set; }
    }
}
