using GraphQL.Types;
using SegmentSniper.Services.Common;

namespace SegmentSniper.GraphQL.Types
{
    public class DeleteResultGraphType : ObjectGraphType<DeleteResult>
    {
        public DeleteResultGraphType()
        {
            Name = "DeleteResult";
            Field(x => x.Success).Description("Indicates if the deletion was successful.");
        }
    }

}
