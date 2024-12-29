using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using SegmentSniper.Services.Garage;

namespace SegmentSniper.GraphQL.Mutations
{
    public class GarageMutations : ObjectGraphType
    {
        public GarageMutations(IUpdateGarage updateGarage)
        {
            Name = "GarageMutations";

            // Define the updateGarage mutation
            AddField(new FieldType
            {
                Name = "updateGarage",
                Type = typeof(BooleanGraphType), // The return type of the mutation
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose garage is being updated" }
                ),
                Resolver = new FuncFieldResolver<bool>(context =>
                {
                    // Retrieve the userId from the request arguments
                    var userId = context.GetArgument<string>("userId");

                    // Call the UpdateGarage action handler
                    updateGarage.ExecuteAsync(new UpdateGarageContract(userId));

                    // Return true to indicate success
                    return true;
                }),
                Description = "Updates the bikes in the user's garage."
            }).AuthorizeWithPolicy("UserPolicy");
        }
    }
}
