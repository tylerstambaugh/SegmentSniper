using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Data.Entities.ManageProfile;
using SegmentSniper.Data.Entities.StravaToken;

namespace SegmentSniper.Data
{
    public interface ISegmentSniperDbContext
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
               

        DbSet<ApplicationUser> Users { get; set; }
        DbSet<StravaApiToken> StravaTokens { get; set; }
        DbSet<ChangeEmailVerificationCode> ChangeEmailVerificationCodes { get; set; }

        int SaveChanges();
    }
}