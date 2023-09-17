using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Api.ActionHandlers.SniperActionHandlers;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using SegmentSniper.Services.StravaToken;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient;
using StravaApiClient.Services.Activity;

namespace SegmentSniper.Api.Helpers
{
    public static class ServiceRegistrations
    {
        public static void RegisterServices(IServiceCollection services)
        {

            //action handlers
            services.AddScoped<ILoginUserActionHandler, LoginUserActionHandler>();
            services.AddScoped<IRegisterUserActionHandler, RegisterUserActionHandler>();
            services.AddScoped<IRefreshTokenActionHandler, RefreshTokenActionHandler>();
            services.AddScoped<IGetSummaryActivityForTimeRangeActionHandler, GetSummaryActivityForTimeRangeActionHandler>();


            //auth services
            services.AddScoped<IRegisterUser, RegisterUser>();
            services.AddScoped<ICreateToken, CreateToken>();
            services.AddScoped<IRefreshToken, RefreshToken>();
            services.AddScoped<IAuthenticateUser, AuthenticateUser>();
            services.AddScoped<IGenerateRefreshToken, GenerateRefreshToken>();
            services.AddScoped<IGetPrincipalFromExpiredToken, GetPrincipalFromExpiredToken>();
            services.AddScoped<IGetUserRoles, GetUserRoles>();

            //strava API service
            services.AddScoped<IStravaRequestClient, StravaRequestClient>();

            //strava services
            services.AddScoped<IGetStravaTokenForUser, GetStravaTokenForUser>();
            services.AddScoped<IAddStravaToken, AddStravaToken>();
            services.AddScoped<IGetSummaryActivityForTimeRange, GetSummaryActivityForTimeRange>();
        }
    }
}
