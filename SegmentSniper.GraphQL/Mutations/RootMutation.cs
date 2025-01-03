using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.GraphQL.Mutations;

public class RootMutation : ObjectGraphType
{
    public RootMutation(IServiceProvider serviceProvider)
    {
        AddField(new FieldType
        {
            Name = "Garage",
            Description = "Add or update bikes and equipment",
            Type = typeof(GarageMutations),
            Resolver = new FuncFieldResolver<object>(_ => serviceProvider.GetRequiredService<GarageMutations>())
        });
    }
}
