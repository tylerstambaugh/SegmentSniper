using GraphQL.Types;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.GraphQL.Types
{
    public sealed class BikeTypeDef : ObjectGraphType<BikeModel>
    {

        public BikeTypeDef()
        {            
            Name = nameof(BikeModel);
            Description = "A bike in the collection";

            Field(b => b.BikeId, type: typeof(StringGraphType))
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

            Field(b => b.FrameType, type: typeof(IntGraphType))
                 .Description("Int representation of the frame type of the bike, maps to FrameTypeEnum");

            Field(b => b.MetersLogged, type: typeof(DecimalGraphType))
                .Description("How many miles have been logged on the bike");

        }

    }
}
