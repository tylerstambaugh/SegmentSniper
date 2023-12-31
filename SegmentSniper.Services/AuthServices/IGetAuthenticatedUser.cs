
using SegmentSniper.Data.Entities.Auth;

namespace SegmentSniper.Services.AuthServices
{
    public interface IGetAuthenticatedUser
    {
        Task<AuthenticateUserContract.Result> ExecuteAsync(GetAuthenticatedUserContract contract);

        public class GetAuthenticatedUserContract
        {
            public GetAuthenticatedUserContract(string userId)
            {
                UserId = userId;
            }

            public string UserId { get; }

            public class Result
            {
                public ApplicationUser? LoggedInUser { get; set; }
                public List<string>? Roles { get; set; }
            }
        }
    }
}