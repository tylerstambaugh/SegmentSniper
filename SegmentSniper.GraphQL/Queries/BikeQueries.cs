﻿using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
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
                Name = "byId",
                Description = "Retrieve a bike by its Id",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id", Description = "The ID of the bike" }
                ),
                Resolver = new FuncFieldResolver<object>(async context =>
                {
                    var service = context.RequestServices.GetRequiredService<IGetBikeById>();
                    var bikeModel = await service.ExecuteAsync(new GetBikeByIdContract
                    {
                        BikeId = context.GetArgument<string>("id")
                    });

                    if (bikeModel == null)
                    {
                        throw new ExecutionError($"Bike with ID '{context.GetArgument<string>("id")}' not found.");
                    }

                    return bikeModel;
                })
            });

            AddField(new FieldType
            {
                Name = "byUserId",
                Description = "Retrieve all bikes for a user",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The Id of the iser" }
                ),
                Resolver = new FuncFieldResolver<object>(async context =>
                {
                    var service = context.RequestServices.GetRequiredService<IGetAllBikesByUserId>();
                    var userId = context.GetArgument<string>("userId");

                    var bikeModels = await service.ExecuteAsync(new GetAllBikesByUserIdContract(userId));

                    if (bikeModels == null)
                    {
                        throw new ExecutionError($"User with ID '{context.GetArgument<string>("userId")}' not found.");
                    }

                    return bikeModels;
                })
            });
        }

    }
}