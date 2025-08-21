using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Data.Entities.MachineLearning;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Data.Entities.StravaWebhookSubscription;
using SegmentSniper.Data.Entities.User;

namespace SegmentSniper.Data
{
    public class SegmentSniperDbContext : DbContext, ISegmentSniperDbContext
    {
        public SegmentSniperDbContext(DbContextOptions<SegmentSniperDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ML_SegmentEffort> ML_SegmentEfforts { get; set; }
        public virtual DbSet<ML_SegmentPredictionModel> ML_SegmentPredictionModels { get; set; }
        public virtual DbSet<SegmentPredictionRegressionMetrics> SegmentPredictionRegressionMetrics { get; set; }
        public virtual DbSet<Bike> Bikes { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<BikeActivity> BikeActivities { get; set; }
        public virtual DbSet<StravaWebhookSubscription> StravaWebhookSubscription { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder
            //    .UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|SegmentSniper.mdf;Initial Catalog=SegmentSniper;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ignore the SegmentSniperLog table by its name
            modelBuilder.Entity<SegmentSniperLogEntity>().ToTable("SegmentSniperLog", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<Bike>()
           .HasMany(b => b.Equipment) // A Bike has many Equipment
           .WithOne(e => e.Bike)      // Each Equipment belongs to one Bike
           .HasForeignKey(e => e.BikeId); // Equipment's foreign key is BikeId


        }

        // Define a dummy entity class for the log table
        public class SegmentSniperLogEntity
        {
            public int Id { get; set; }
            public string Message { get; set; }
            public string MessageTemplate { get; set; }
            public string Level { get; set; }
            public DateTimeOffset TimeStamp { get; set; }
            public string Exception { get; set; }
            public string Properties { get; set; }
            public byte[] LogEvent { get; set; }
        }
    }
}