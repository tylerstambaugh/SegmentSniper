using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using static SegmentSniper.Services.AuthServices.IGetPrincipalFromExpiredToken;

namespace SegmentSniper.Services.AuthServices
{
    public class GetPrincipalFromExpiredToken : IGetPrincipalFromExpiredToken
    {
        private readonly IConfiguration _configuration;

        public GetPrincipalFromExpiredToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public GetPrincipalFromExpiredTokenContract.Result Execute(GetPrincipalFromExpiredTokenContract contract)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(contract.AccessToken, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return new GetPrincipalFromExpiredTokenContract.Result(principal);
        }
    }
}
