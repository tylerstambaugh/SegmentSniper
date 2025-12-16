using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities;
using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Data.Entities.MachineLearning;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Data.Entities.StravaWebhookSubscription;
using SegmentSniper.Data.Entities.User;
using System.Linq.Expressions;

namespace SegmentSniper.Data
{
    public class SegmentSniperDbContext : DbContext, ISegmentSniperDbContext
    {
        public SegmentSniperDbContext(DbContextOptions<SegmentSniperDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<AppUser> Users { get; set; }
        public virtual DbSet<ML_SegmentEffort> ML_SegmentEfforts { get; set; }
        public virtual DbSet<ML_SegmentPredictionModel> ML_SegmentPredictionModels { get; set; }
        public virtual DbSet<SegmentPredictionRegressionMetrics> SegmentPredictionRegressionMetrics { get; set; }
        public virtual DbSet<Bike> Bikes { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<BikeActivity> BikeActivities { get; set; }
        public virtual DbSet<StravaWebhookSubscription> StravaWebhookSubscription { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var now = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = now;
                    entry.Entity.UpdatedDate = now;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedDate = now;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            var now = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = now;
                    entry.Entity.UpdatedDate = now;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedDate = now;
                }
            }

            return base.SaveChanges();
        }

        public IQueryable<TEntity> QueryAll<TEntity>() where TEntity : BaseEntity
        {
            return Set<TEntity>().IgnoreQueryFilters();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder
            //    .UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|SegmentSniper.mdf;Initial Catalog=SegmentSniper;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var property = Expression.Property(parameter, nameof(BaseEntity.DeletedDate));
                    var nullValue = Expression.Constant(null, typeof(DateTime?));
                    var body = Expression.Equal(property, nullValue);

                    var lambda = Expression.Lambda(
                        typeof(Func<,>).MakeGenericType(entityType.ClrType, typeof(bool)),
                        body,
                        parameter);
                    
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }

            // Ignore the SegmentSniperLog table by its name
            modelBuilder.Entity<SegmentSniperLogEntity>().ToTable("SegmentSniperLog", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<Bike>()
           .HasMany(b => b.Equipment) // A Bike has many Equipment
           .WithOne(e => e.Bike)      // Each Equipment belongs to one Bike
           .HasForeignKey(e => e.BikeId); // Equipment's foreign key is BikeId

            modelBuilder.Entity<SegmentPredictionRegressionMetrics>()
            .HasIndex(m => m.AuthUserId)
            .IsUnique();

            modelBuilder.Entity<AppUser>()
            .Property(u => u.AuthUserId)
            .HasMaxLength(255);

            modelBuilder.Entity<BikeActivity>(entity =>
            {
                // Unique index
                entity.HasIndex(b => b.StravaActivityId)
                      .IsUnique();

                // Relationship to AppUser
                entity.HasOne(ba => ba.AppUser)
                      .WithMany(u => u.BikeActivities)
                      .HasForeignKey(ba => ba.AuthUserId)
                      .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasOne(e => e.Bike)
                      .WithMany(b => b.Equipment)
                      .HasForeignKey(e => e.BikeId)                      
                      .OnDelete(DeleteBehavior.Cascade);
                // Relationship to AppUser
                entity.HasOne(e => e.AppUser)
                      .WithMany(u => u.Equipment)
                      .HasForeignKey(e => e.AuthUserId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.Property(e => e.MilesAtInstall)
                    .HasColumnType("decimal(7,2)");

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(10,2)");

                entity.Property(e => e.TotalMilage)
                    .HasColumnType("decimal(7,2)");
            });

            modelBuilder.Entity<Bike>()
                 .HasIndex(e => new { e.AuthUserId, e.DeletedDate });

            modelBuilder.Entity<Equipment>()
                .HasIndex(e => new { e.AuthUserId, e.DeletedDate });

            modelBuilder.Entity<BikeActivity>()
                .HasIndex(e => new { e.AuthUserId, e.DeletedDate });
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