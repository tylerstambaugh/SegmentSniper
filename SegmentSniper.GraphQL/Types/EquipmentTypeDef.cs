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

            Field<NonNullGraphType<IdGraphType>>("equipmentId").Description("The id of the piece of equipment");
            Field<NonNullGraphType<StringGraphType>>("name").Description("The name of the piece of equipment");
            Field<StringGraphType>("description").Description("The description of the piece of equipment");
            Field<DecimalGraphType>("price").Description("The amount paid for the equipment");
            Field<DateTimeGraphType>("installDate").Description("The date the equipment was installed");
            Field<DateTimeGraphType>("retiredDate").Description("The date the equipment was retired");
            Field<DecimalGraphType>("milesLogged").Description("The miles logged on the equipment");
            Field<IntGraphType>("replaceAtMiles").Description("The sum total of miles that the equipment should be replaced");
            Field<IntGraphType>("milesUntilReplaceReminder").Description("Miles until a reminder to replace the equipment is sent");
        }
    }

    public class EquipmentInputTypeDef : InputObjectGraphType<EquipmentModel>
    {
        public EquipmentInputTypeDef()
        {
            Name = "EquipmentInput";
            Field(e => e.EquipmentId).Description("The Id of the equipment, used for updating existing equipment");
            Field(e => e.Name).Description("The name of the equipment.");
            Field(e => e.Description).Description("The description of the equipment.");
            Field(e => e.Price).Description("The price of the equipment.");
            Field(e => e.InstallDate).Description("The installation date of the equipment.");
            Field(e => e.RetiredDate).Description("The date the equipment was retired");
            Field(e => e.MilesLogged).Description("The miles logged on the equipment");
            Field(e => e.ReplaceAtMiles).Description("The sum total of miles that the equipment should be replaced");
            Field(e => e.MilesUntilReplaceReminder).Description(("Miles until a reminder to replace the equipment is sent"));
        }
    }

    public class BikeInputTypeDef : InputObjectGraphType<BikeModel>
    {
        public BikeInputTypeDef()
        {
            Name = "BikeInput";
            Field(b => b.UserId).Description("The Id of the user the bike belongs to");
            Field(b => b.Name).Description("The name of the bike");
            Field(b => b.Description).Description("The description of the bike");
            Field(b => b.BrandName).Description("The brand of the bike");
            Field(b => b.ModelName).Description("The model of the bike");
            Field(b => b.FrameType).Description("The enum value of the frame type");
            Field(b => b.MetersLogged).Description("The odometer of the bike in meters");
        }
    }
}
