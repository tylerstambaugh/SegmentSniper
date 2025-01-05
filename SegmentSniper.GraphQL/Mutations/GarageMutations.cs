using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.GraphQL.Types;
using SegmentSniper.Models.Models.Garage;
using SegmentSniper.Services.Garage;

namespace SegmentSniper.GraphQL.Mutations
{
    public class GarageMutations : ObjectGraphType
    {
        public GarageMutations()
        {
            Name = "GarageMutations";

            //// Define the updateGarage mutation
            //AddField(new FieldType
            //{
            //    Name = "updateGarage",
            //    Type = typeof(BooleanGraphType), // The return type of the mutation
            //    Arguments = new QueryArguments(
            //        new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose garage is being updated" }
            //    ),
            //    Resolver = new FuncFieldResolver<bool>(context =>
            //    {
            //        // Retrieve the userId from the request arguments
            //        var userId = context.GetArgument<string>("userId");

            //        // Call the UpdateGarage action handler
            //      //  updateGarage.ExecuteAsync(new UpdateGarageContract(userId));

            //        // Return true to indicate success
            //        return true;
            //    }),
            //    Description = "Updates the bikes in the user's garage."
            //}).AuthorizeWithPolicy("UserPolicy");

            AddField(new FieldType
            {
                Name = "AddEquipmentToBike",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "bikeId", Description = "The Id of the bike the equipment id being added to." },
                    new QueryArgument<NonNullGraphType<EquipmentInputType>> {  Name = "equipment", Description = "The details of the equipment being added."}
                ),
                Resolver = new FuncFieldResolver<BikeModel>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var bikeId = context.GetArgument<string>("bikeId");
                    var equipment = context.GetArgument<EquipmentModel>("equipment");

                    var service = context.RequestServices.GetRequiredService<IUpsertBikeEquipment>();

                    var result = await service.ExecuteAsync(new UpsertBikeEquipmentContract
                    {
                        UserId = userId,
                        BikeId = bikeId,
                        Equipment = equipment,
                    });

                    return result.BikeModel;

                })
            }).AuthorizeWithPolicy("UserPolicy");
        }
    }
}
