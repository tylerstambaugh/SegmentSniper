using GraphQL;
using SegmentSniper.Models.Auth;
using System.Security.Claims;

namespace SegmentSniper.GraphQL
{
    public static class GraphQLContextExtensions
    {
        public static string? GetUserId(this IResolveFieldContext context)
        {
            var userContext = context.UserContext as GraphQLUserContext;
            return userContext?.User?.FindFirst("sub")?.Value
                ?? userContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
