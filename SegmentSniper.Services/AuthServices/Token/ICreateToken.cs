using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SegmentSniper.Services.AuthServices.Token
{
    public interface ICreateToken
    {
        JwtSecurityToken Execute(List<Claim> authClaims);
    }
}