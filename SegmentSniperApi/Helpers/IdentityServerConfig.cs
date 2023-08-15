using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data.Entities;
using System.Configuration;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;

namespace SegmentSniper.Api.Helpers
{
    public static class IdentityServerConfig
    {
        public static IIdentityServerBuilder ConfigureIdentityServer(this IIdentityServerBuilder builder, IConfiguration configuration, IWebHostEnvironment environment)
        {
            var thumbPrint = configuration["CertificateThumbprint"];
            var connectionString = configuration.GetConnectionString("SegmentSniper");

            if (environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential(false);
            }
            else
            {
                builder.AddSigningCredential(LoadSigningCertificate(thumbPrint));
            }

            builder.AddAspNetIdentity<ApplicationUser>()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(connectionString);
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(connectionString);
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                });

            return builder;
        }

        private static X509Certificate2 LoadSigningCertificate(string thumbPrint)
        {
            var store = new X509Store(StoreName.Root, StoreLocation.CurrentUser);

            try
            {
                store.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certCollection = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, validOnly: false);

                if (certCollection == null || certCollection.Count == 0)
                {
                    throw new ConfigurationErrorsException("No certificate found containing the specified thumbprint.");
                }

                return certCollection[0];
            }
            finally
            {
                store.Close();
            }
        }
    }
}

