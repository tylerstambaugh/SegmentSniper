//using Microsoft.AspNetCore.Identity;
//using SegmentSniper.Data.Entities.Auth;
//using SegmentSniper.Models.Models.Auth;
//using SegmentSniper.Services.AuthServices.Token;
//using System.IdentityModel.Tokens.Jwt;
//using static SegmentSniper.Services.AuthServices.IGetPrincipalFromExpiredToken;
//using static SegmentSniper.Services.AuthServices.IRefreshToken;

//namespace SegmentSniper.Services.AuthServices
//{
//    public class RefreshToken : IRefreshToken
//    {
//        private readonly IGetPrincipalFromExpiredToken _getPrincipalFromExpiredToken;
//        private readonly UserManager<ApplicationUser> _userManager;
//        private readonly ICreateToken _createToken;
//        private readonly IGenerateRefreshToken _generateRefreshToken;

//        public RefreshToken(IGetPrincipalFromExpiredToken getPrincipalFromExpiredToken, UserManager<ApplicationUser> userManager, ICreateToken createToken, IGenerateRefreshToken generateRefreshToken)
//        {
//            _getPrincipalFromExpiredToken = getPrincipalFromExpiredToken;
//            _userManager = userManager;
//            _createToken = createToken;
//            _generateRefreshToken = generateRefreshToken;
//        }

//        public async Task<RefreshTokenContract.Result> Execute(RefreshTokenContract contract)
//        {
//            string? accessToken = contract.TokenToRefresh.AccessToken;
//            string? refreshToken = contract.TokenToRefresh.RefreshToken;
//            try
//            {

//            var principal = _getPrincipalFromExpiredToken.Execute(new GetPrincipalFromExpiredTokenContract(accessToken));
//            if (principal == null)
//            {
//                throw new ArgumentException($"Invalid access or refresh token {nameof(principal)}");
//            }

//            string username = principal.Principal.Identity.Name;

//            var user = await _userManager.FindByNameAsync(username);

//            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiration <= DateTime.Now)
//            {
//                throw new ArgumentException($"Invalid access or refresh token {nameof(principal)}");
//            }

//            var newAccessToken = _createToken.Execute(new CreateTokenContract(principal.Principal.Claims.ToList()));
//            var newRefreshToken = _generateRefreshToken.Execute();

//            user.RefreshToken = newRefreshToken;
//            await _userManager.UpdateAsync(user);

//            return new RefreshTokenContract.Result
//            {
//                RefreshedToken = new SegmentSniperTokenData
//                {
//                    RefreshToken = newRefreshToken,
//                    AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
//                    Expiration = newAccessToken.ValidTo,
//                }
//            };
//            }
//            catch (Exception ex)
//            {
//                throw new ApplicationException("Error creating refresh token:", ex);
//            }
//        }
//    }
//}
