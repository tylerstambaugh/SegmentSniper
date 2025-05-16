using GraphQL.Types;
using SegmentSniper.Services.Garage.Equipment;

namespace SegmentSniper.GraphQL.Types
{
    public class DeleteResultGraphType : ObjectGraphType<DeleteEquipmentContract.Result>
    {
        public DeleteResultGraphType()
        {
            Name = "DeleteResult";
            Field(x => x.Success).Description("Indicates if the deletion was successful.");            
        }
    }

}
