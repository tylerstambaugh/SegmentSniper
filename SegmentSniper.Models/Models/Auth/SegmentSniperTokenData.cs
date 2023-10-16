namespace SegmentSniper.Models.Models.Auth
{
    public class SegmentSniperTokenData
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? Expiration { get; set; }
    }
}