using GraphQL.Types;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.GraphQL.Types
{
    public sealed class EquipmentTypeDef : ObjectGraphType<EquipmentModel>
    {

        public EquipmentTypeDef()
        {            
            Name = nameof(EquipmentModel);
            Description = "A piece of equipment belonging to a bike";

            Field(e => e.Id, type: typeof(IntGraphType))
                .Description("The Id of the piece of equipment");

            Field(e => e.BikeId, type: typeof(StringGraphType))
                .Description("The Id of the bike the quipment is on");

            Field(e => e.UserId, type: typeof(StringGraphType))
                 .Description("The Id of the owner of the quipment");

            Field(e => e.Name, type: typeof(StringGraphType))
                 .Description("The hame of the piece of equipment");

            Field(e => e.Description, type: typeof(StringGraphType))
                    .Description("The description of the piece of equipment");

            Field(e => e.MilesLogged, type: typeof(DecimalGraphType))
                    .Description("The Id of the piece of equipment");

            Field(e => e.InstallDate, type: typeof(DateTimeGraphType))
                    .Description("The date the equipment was installed");

            Field(e => e.RetiredDate, type: typeof(DateTimeGraphType))
                    .Description("The date the equipment was retired");

            Field(e => e.Price, type: typeof(DecimalGraphType))
                    .Description("The amount paid for the equipment");

            Field(e => e.ReplaceAtMiles, type: typeof(IntGraphType))
                    .Description("The sum total of miles that the equipment should be replaced");

            Field(e => e.MilesUntilReplaceReminder, type: typeof(IntGraphType))
                    .Description("A configurable number of miles until ReplaceAtMiles is achieved at which point a reminder will be sent to replace the equipment");

        }
    }
}
