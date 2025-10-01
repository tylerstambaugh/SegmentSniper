using GraphQL.Types;
using SegmentSniper.Models.Garage;

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
            Field<DateTimeGraphType>("updatedDate").Description("The date the equipment was last updated");
            Field<DateTimeGraphType>("retiredDate").Description("The date the equipment was retired");
            Field<DateTimeGraphType>("reminderDate").Description("The date you want to be reminded to replace the equipment");
            Field<TimeSpanSecondsGraphType>("reminderDuration").Description("The amount of time until you want to be remined to replace the equipment");
            Field<DecimalGraphType>("totalMiles").Description("Total miles on the equipment");
            Field<DecimalGraphType>("milesAtInstall").Description("The miles on the equipment when it was added to this bike");
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
            Field(e => e.UpdatedDate).Description("The installation date of the updated.");
            Field(e => e.RetiredDate).Description("The date the equipment was retired");
            Field(e => e.ReminderDate).Description("The date you want to be reminded to replace the equipment");
            Field(e => e.ReminderDuration).Description("The amount of time until you want to be remined to replace the equipment");
            Field(e => e.TotalMiles).Description("The miles logged on the equipment");
            Field(e => e.MilesAtInstall).Description("The miles on the equipment when it was added to this bike");
            Field(e => e.ReplaceAtMiles).Description("The sum total of miles that the equipment should be replaced");
            Field(e => e.MilesUntilReplaceReminder).Description(("Miles until a reminder to replace the equipment is sent"));
        }
    }
}
