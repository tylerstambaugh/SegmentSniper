﻿using AutoMapper;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Api.Configuration.MappingProfiles;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Auth;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using SegmentSniper.Services.StravaToken;

namespace SegmentSniper.Tests.Handlers.LoginActionHandlerTests
{
    [TestClass]
    public abstract class TestBase
    {
        protected LoginUserActionHandler Handler;
        protected IMapper _mapper;
        protected AuthenticateUser _authenticateUserService;
        protected CreateToken _createToken;
        protected UserManager<ApplicationUser> _userMgr;
        protected IConfiguration _configuration;
        protected GenerateRefreshToken _generateRefreshToken;
        protected GetUserRoles _getUserRoles;
        protected GetStravaTokenForUser _getStravaTokenForUser;
        protected SegmentSniperDbContext _context;

        [TestInitialize]
        public virtual async Task ArrangeAsync()
        {
            var services = new ServiceCollection();

            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>(); // Replace with your AutoMapper profile
            });

            _mapper = mapperConfig.CreateMapper();
            services.AddSingleton(_mapper);

            services.AddDbContext<SegmentSniperDbContext>(options =>
                options.UseInMemoryDatabase(databaseName: "SegmentSniper"));

            var serviceProvider = services.BuildServiceProvider();

            var dbOptions = new DbContextOptionsBuilder<SegmentSniperDbContext>()
                .UseInMemoryDatabase(databaseName: "SegmentSniper")
                .Options;

            var operationalStoreOptions = Options.Create(new OperationalStoreOptions
            {
                ConfigureDbContext = builder =>
                {
                    builder.UseInMemoryDatabase("SegmentSniper");
                }
            });
            _context = new SegmentSniperDbContext(dbOptions, operationalStoreOptions);

            _userMgr = new UserManager<ApplicationUser>(
               new UserStore<ApplicationUser>(_context),
               null, // TODO: Provide IOptions<IdentityOptions>
               new PasswordHasher<ApplicationUser>(),
               null, // TODO: Provide IEnumerable<IUserValidator<ApplicationUser>>
               null, // TODO: Provide IEnumerable<IPasswordValidator<ApplicationUser>>
                null, // TODO: Provide ILookupNormalizer
               null, // TODO: Provide IdentityErrorDescriber
               serviceProvider, // This is the service provider
               null); // TODO: Provide ILogger<UserManager<ApplicationUser>>


            var inMemorySettings = new Dictionary<string, string> {
                {"TopLevelKey", "TopLevelValue"},
                {"JWT:Secret", "random string"},
                {"JWT:TokenValidityInMinutes", "30"},
                {"JWT:ValidIssuer", "*"},
                {"JWT:ValidAudience", "*"},
                {"JWT:RefreshTokenValidityInDays", "7"},
            };

           _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            _authenticateUserService = new AuthenticateUser(_context, _userMgr);
            _createToken = new CreateToken(_configuration);
            _generateRefreshToken = new GenerateRefreshToken();


            _getUserRoles = new GetUserRoles(_userMgr, _configuration);
            _getStravaTokenForUser = new GetStravaTokenForUser(_context, _mapper);
            Handler = new LoginUserActionHandler(_authenticateUserService, _createToken, _userMgr, _configuration, _generateRefreshToken, _getUserRoles, _getStravaTokenForUser);

            InternalArrangeAsync();
        }

        protected abstract Task InternalArrangeAsync();
    }
}
