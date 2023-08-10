using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Data
{
    public class SegmentSniperDbContext : IdentityDbContext<ApplicationUser>
    {
        public SegmentSniperDbContext(DbContextOptions<SegmentSniperDbContext> options) : base(options)
        {
            
        }
    }
}