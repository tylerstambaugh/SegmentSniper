using GraphQL.Resolvers;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using SegmentSniper.GraphQL.Queries;

public class RootQuery : ObjectGraphType
{
    public RootQuery(IServiceProvider serviceProvider)
    {
        AddField(new FieldType
        {
            Name = "Bikes",
            Description = "Bike related queries",
            Type = typeof(BikeQueries),
            Resolver = new FuncFieldResolver<object>(_ => serviceProvider.GetRequiredService<BikeQueries>())
        });
    }
}