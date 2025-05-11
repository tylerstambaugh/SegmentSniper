using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.ApplicationLogic.ActionHandlers.GarageActionHandlers;
using SegmentSniper.GraphQL.Types;
using SegmentSniper.Services.Garage;

namespace SegmentSniper.GraphQL.Queries
{
    public class BikeQueries : ObjectGraphType
    {
        public BikeQueries()
        {
            AddField(new FieldType
            {
                Name = "byBikeId",
                Description = "Retrieve a bike by its Id",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "bikeId", Description = "The ID of the bike" }
                ),
                Resolver = new FuncFieldResolver<object>(async context =>
                {
                    var service = context.RequestServices.GetRequiredService<IGetBikeById>();
                    var result = await service.ExecuteAsync(new GetBikeByIdContract
                    {
                        BikeId = context.GetArgument<string>("bikeId")
                    });

                    if (result == null)
                    {
                        throw new ExecutionError($"Bike with ID '{context.GetArgument<string>("id")}' not found.");
                    }

                    return result.Bike;
                })
            });

            AddField(new FieldType
            {
                Name = "byUserId",
                Description = "Retrieve all bikes for a user",
                Type = typeof(ListGraphType<BikeTypeDef>),
                Arguments = new QueryArguments(
                new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The Id of the user" }
                ),
                Resolver = new FuncFieldResolver<object>(async context =>
                {
                    var service = context.RequestServices.GetRequiredService<IGetBikesByUserIdActionHandler>();
                    var userId = context.GetArgument<string>("userId");

                    try
                    {
                        var queriedBikes = await service.ExecuteAsync(new GetBikesByUserIdRequest(userId));

                        if (queriedBikes == null || queriedBikes.Bikes == null)
                        {
                            throw new ExecutionError($"User with ID '{userId}' not found or has no bikes.");
                        }

                        return queriedBikes.Bikes;
                    }
                    catch (Exception ex)
                    {
                        var error = new ExecutionError("An error occurred while retrieving bikes.", ex);
                        error.Data.Add("userId", userId);
                        throw error;
                    }

                })
            });
        }

    }
}
