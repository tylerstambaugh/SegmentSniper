using GraphQL.Resolvers;
using GraphQL.Types;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.GraphQL.Types
{
    public sealed class BikeTypeDef : ObjectGraphType<BikeModel>
    {

        public BikeTypeDef()
        {            
            Name = nameof(BikeModel);
            Description = "A bike in the collection";

            Field(b => b.BikeId, type: typeof(NonNullGraphType<StringGraphType>))
                .Description("Id of the bike");            

            Field(b => b.UserId, type: typeof(StringGraphType))
                .Description("The UserId of the bike owner");

            Field(b => b.IsPrimary, type: typeof(BooleanGraphType))
                .Description("If the bike is the primary equipment for the athlete");

            Field(b => b.Name, type: typeof(StringGraphType))
                .Description("The name of the bike");

            Field(b => b.Description, type: typeof(StringGraphType))
                .Description("A description of the bike");

            Field(b => b.BrandName, type: typeof(StringGraphType))
                 .Description("The brand of the bike");

            Field(b => b.ModelName, type: typeof(StringGraphType))
                 .Description("Themodel of the bike");

            AddField(new FieldType
            {
                Name = "frameType",
                Description = "Int representation of the frame type of the bike, maps to FrameTypeEnum",
                Type = typeof(IntGraphType),
                Resolver = new FuncFieldResolver<BikeModel, int>(context => (int)context.Source.FrameType)
            });

            Field(b => b.MetersLogged, type: typeof(DecimalGraphType))
                .Description("How many miles have been logged on the bike");

            Field(b => b.Equipment, type: typeof(ListGraphType<EquipmentTypeDef>))
                .Description("List of equipment on the bike.");

        }
    }

    public class BikeInputTypeDef : InputObjectGraphType<BikeModel>
    {
        public BikeInputTypeDef()
        {
            Name = "BikeInput";

            Field<IdGraphType>(nameof(BikeModel.UserId)).Description("The Id of the user the bike belongs to");
            Field<IdGraphType>(nameof(BikeModel.BikeId)).Description("The Id of the user the bike belongs to");
            Field<NonNullGraphType<StringGraphType>>(nameof(BikeModel.Name)).Description("The name of the bike");
            Field<StringGraphType>(nameof(BikeModel.Description)).Description("The description of the bike");
            Field<StringGraphType>(nameof(BikeModel.BrandName)).Description("The brand of the bike");
            Field<StringGraphType>(nameof(BikeModel.ModelName)).Description("The model of the bike");
            Field<NonNullGraphType<FrameTypeEnumType>>("frameType").Description("The enum value of the frame type");
            Field<FloatGraphType>(nameof(BikeModel.MetersLogged)).Description("The odometer of the bike in meters");            
        }
    }

    public sealed class FrameTypeEnumType : EnumerationGraphType<FrameType>
    {
        public FrameTypeEnumType()
        {
            Name = "FrameTypeEnum";
            Description = "The type of bike frame.";
        }
    }
}
