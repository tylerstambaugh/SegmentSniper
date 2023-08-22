using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SegmentSniper.Services.AuthServices.Token
{
    public interface ICreateToken
    {
        JwtSecurityToken Execute(CreateTokenContract contract);

        public class CreateTokenContract
        {
            public CreateTokenContract(List<Claim> authClaims)
            {
                AuthClaims = authClaims;
            }
            public List<Claim> AuthClaims { get; set; }

            public class Result
            {
                public JwtSecurityToken Token { get; set; }
            }
        }
    }
}