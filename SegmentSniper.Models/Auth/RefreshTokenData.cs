using Microsoft.Win32.SafeHandles;

namespace SegmentSniper.Models.Auth
{
    public class RefreshTokenData
    {
        public RefreshTokenData(string refreshToken, string accessToken)
        {
            RefreshToken = refreshToken;
            AccessToken = accessToken;
        }

        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
    }
}
