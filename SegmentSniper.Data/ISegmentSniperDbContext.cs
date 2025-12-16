using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Data.Entities.MachineLearning;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Data.Entities.StravaWebhookSubscription;
using SegmentSniper.Data.Entities.User;

namespace SegmentSniper.Data
{
    public interface ISegmentSniperDbContext
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbSet<AppUser> Users { get;  }
        DbSet<ML_SegmentEffort> ML_SegmentEfforts { get;  }
        DbSet<ML_SegmentPredictionModel> ML_SegmentPredictionModels { get;  }
        DbSet<SegmentPredictionRegressionMetrics> SegmentPredictionRegressionMetrics { get; }
        DbSet<Bike> Bikes { get; }
        DbSet<Equipment> Equipment { get; }

        DbSet<BikeActivity> BikeActivities { get; }
        DbSet<StravaWebhookSubscription> StravaWebhookSubscription { get; }
        DatabaseFacade Database { get; }

        int SaveChanges();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}