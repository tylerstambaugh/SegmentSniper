using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Data.Entities.MachineLearning;
using SegmentSniper.Data.Entities.ManageProfile;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Data.Entities.StravaToken;
using SegmentSniper.Data.Entities.StravaWebhookSubscription;

namespace SegmentSniper.Data
{
    public interface ISegmentSniperDbContext
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;


        DbSet<ApplicationUser> Users { get; set; }
        DbSet<StravaApiToken> StravaTokens { get; set; }
        DbSet<ChangeEmailVerificationCode> ChangeEmailVerificationCodes { get; set; }
        DbSet<ML_SegmentEffort> ML_SegmentEfforts { get; set; }
        DbSet<ML_SegmentPredictionModel> ML_SegmentPredictionModels { get; set; }
        DbSet<SegmentPredictionRegressionMetrics> SegmentPredictionRegressionMetrics { get; set; }
        DbSet<Bike> Bikes { get; set; }
        DbSet<Equipment> Equipment { get; set; }

        DbSet<BikeActivity> BikeActivities { get; set; }
        DbSet<StravaWebhookSubscription> StravaWebhookSubscription { get; set; }

        int SaveChanges();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}