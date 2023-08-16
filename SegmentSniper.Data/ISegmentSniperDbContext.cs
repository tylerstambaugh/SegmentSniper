using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities;


namespace SegmentSniper.Data
{
    public interface ISegmentSniperDbContext
    {
        //DbSet<TEntity> Set<TEntity>() where TEntity : class;

        DbSet<ApplicationUser> Users { get; set; }

        int SaveChanges();
    }
}