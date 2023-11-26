using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SegmentSniper.Services.AuthServices.Token
{
    public class CreateToken : ICreateToken
    {
        private readonly IConfiguration _configuration;

        public CreateToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public JwtSecurityToken Execute(CreateTokenContract contract)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT-Key"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: contract.AuthClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)               
                );

            return token;
        }
    }
}
