using GraphQL.Types;
using SegmentSniper.Services.Garage.Equipment;

namespace SegmentSniper.GraphQL.Types
{
    public class DeleteEquipmentResultGraphType : ObjectGraphType<DeleteEquipmentContract.Result>
    {
        public DeleteEquipmentResultGraphType()
        {
            Name = "DeleteEquipmentResult";
            Field(x => x.Success).Description("Indicates if the deletion was successful.");            
        }
    }

}
