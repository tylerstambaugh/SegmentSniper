using SegmentSniper.Data;
using SegmentSniper.Models.Models.User;
using System.Text;
using XSystem.Security.Cryptography;

namespace SegmentSniper.Api.ActionHandlers.LoginActionHandlers
{
    public class AuthenticateActionHandler : IAuthenticateActionHandler
    {
        

        public AuthenticateActionHandler()
        {
        }

        public AuthenticateUserLoginRequest.Response Handle(AuthenticateUserLoginRequest contract)
        {
            throw new NotImplementedException();
        }
    }
}
