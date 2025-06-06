using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.ApplicationLogic.ActionHandlers.Garage;
using SegmentSniper.GraphQL.Types;
using SegmentSniper.Models.Models.Garage;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.Garage.Equipment;

namespace SegmentSniper.GraphQL.Mutations
{
    public class GarageMutations : ObjectGraphType
    {
        public GarageMutations()
        {
            Name = "GarageMutations";

            // Define the updateGarage mutation
            AddField(new FieldType
            {
                Name = "ImportGarage",
                Type = typeof(ListGraphType<BikeTypeDef>),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose garage is being updated" }
                ),
                Resolver = new FuncFieldResolver<List<BikeModel>>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");

                    var service = context.RequestServices.GetRequiredService<IImportGarageActionHandler>();

                    var result = await service.ExecuteAsync(new ImportGarageRequest(userId));

                    return result.Bikes;
                }),
                Description = "Updates the bikes in the user's garage."
            }).AuthorizeWithPolicy("UserPolicy");


            AddField(new FieldType
            {
                Name = "UpsertBike",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<BikeInputTypeDef>> { Name = "bike", Description = "The bike model to be added" }
                ),
                Resolver = new FuncFieldResolver<BikeModel>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var bike = context.GetArgument<BikeModel>("bike");

                    var service = context.RequestServices.GetRequiredService<IUpsertBike>();

                    var bikeToUpsert = new BikeModel
                    {
                        BikeId = bike.BikeId,
                        UserId = userId,
                        Name = bike.Name,
                        Description = bike.Description,
                        BrandName = bike.BrandName,
                        ModelName = bike.ModelName,
                        FrameType = bike.FrameType,
                        MetersLogged = bike.MetersLogged,
                        ImportedFromStrava = false
                    };

                    var result = await service.ExecuteAsync(new UpsertBikeContract(bikeToUpsert));

                    return result.Bike;
                })
            }).AuthorizeWithPolicy("UserPolicy");

            AddField(new FieldType
            {
                Name = "UpsertBikeEquipment",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "bikeId", Description = "The Id of the bike the equipment id being added to." },
                    new QueryArgument<NonNullGraphType<EquipmentInputTypeDef>> {  Name = "equipment", Description = "The details of the equipment being added."}
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

            AddField(new FieldType
            {
                Name = "RetireEquipmentOnBike",
                Type = typeof(BikeTypeDef),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "bikeId", Description = "The Id of the bike the equipment id being added to." },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "equipmentId", Description = "The Id of the equipment being retired." },
                    new QueryArgument<NonNullGraphType<DateGraphType>> { Name = "retireDate", Description = "The date the equipment is to be retired." }
                ),
                Resolver = new FuncFieldResolver<BikeModel>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var bikeId = context.GetArgument<string>("bikeId");
                    var equipmentId = context.GetArgument<string>("equipmentId");
                    var retireDate = context.GetArgument<DateTime>("retireDate");
                    var service = context.RequestServices.GetRequiredService<IRetireBikeEquipment>();
                    var result = await service.ExecuteAsync(new RetireBikeEquipmentContract
                    {
                        UserId = userId,
                        BikeId = bikeId,
                        EquipmentId = equipmentId,
                        RetireDate = retireDate
                    });
                    return result.BikeModel;
                })
            });

            AddField(new FieldType
            {
                Name = "DeleteEquipment",
                Type = typeof(DeleteResultGraphType),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "equipmentId", Description = "The Id of the equipment being retired." }
                ),
                Resolver = new FuncFieldResolver<bool>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var equipmentId = context.GetArgument<string>("equipmentId");
                    var service = context.RequestServices.GetRequiredService<IDeleteEquipment>();
                    var result = await service.ExecuteAsync(new DeleteEquipmentContract(userId, equipmentId));
                    return result.Success;
                }),
            });

            AddField(new FieldType
            {
                Name = "DeleteBike",
                Type = typeof(DeleteResultGraphType),
                Arguments = new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "userId", Description = "The ID of the user whose bike is being updated" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "bikeId", Description = "The Id of the equipment being retired." }
                ),
                Resolver = new FuncFieldResolver<bool>(async context =>
                {
                    var userId = context.GetArgument<string>("userId");
                    var bikeId = context.GetArgument<string>("bikeId");
                    var service = context.RequestServices.GetRequiredService<IDeleteBike>();
                    var result = await service.ExecuteAsync(new DeleteBikeContract(userId, bikeId));
                    return result.Success;
                }),
            });
        }
    }
}
