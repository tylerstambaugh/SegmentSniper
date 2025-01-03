using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace SegmentSniper.GraphQL
{
    public class GraphQlSchema : Schema
    {
        public GraphQlSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
            Mutation = serviceProvider.GetRequiredService<RootMutation>();
        }
    }
}
