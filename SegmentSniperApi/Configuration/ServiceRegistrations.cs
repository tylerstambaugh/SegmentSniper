using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Api.ActionHandlers.SniperActionHandlers;
using SegmentSniper.Api.ActionHandlers.StravaApiToken;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using SegmentSniper.Services.Common.Adapters;
using SegmentSniper.Services.StravaToken;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient;
using StravaApiClient.Configuration;
using StravaApiClient.Services;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Segment;

namespace SegmentSniper.Api.Configuration
{
    public static class ServiceRegistrations
    {
        public static void RegisterServices(IServiceCollection services)
        {

            //action handlers
            services.AddScoped<ILoginUserActionHandler, LoginUserActionHandler>();
            services.AddScoped<IRegisterUserActionHandler, RegisterUserActionHandler>();
            services.AddScoped<IRevokeTokenActionHandler, RevokeTokenActionHandler>();
            services.AddScoped<IRefreshTokenActionHandler, RefreshTokenActionHandler>();
            services.AddScoped<IGetActivityListByIdActionHandler, GetActivityListByIdActionHandler>();
            services.AddScoped<IGetActivityListForTimeRangeActionHandler, GetActivityListForTimeRangeActionHandler>();
            services.AddScoped<IGetDetailedActivityByIdActionHandler, GetDetailedActivityByIdActionHandler>();
            services.AddScoped<ISnipeSegmentsActionHandler, SnipeSegmentsActionHandler>();
            services.AddScoped<IExchangeAuthCodeForTokenHandler, ExchangeAuthCodeForTokenHandler>();
            services.AddScoped<ICheckForStravaTokenActionHandler, CheckForStravaTokenActionHandler>();
            services.AddScoped<IGetDetailedSegmentBySegmentIdActionHandler, GetDetailedSegmentBySegmentIdActionHandler>();
            services.AddScoped<IStarSegmentActionHandler, StarSegmentActionHandler>();
            services.AddScoped<IGetSnipeSegmentsByActivityIdActionHandler, GetSnipeSegmentsByActivityIdActionHandler>();
            services.AddScoped<IConfirmEmailActionHandler, ConfirmEmailActionHandler>();

            //auth services
            services.AddScoped<IRegisterUser, RegisterUser>();
            services.AddScoped<IRevokeToken, RevokeToken>();
            services.AddScoped<ICreateToken, CreateToken>();
            services.AddScoped<IRefreshToken, RefreshToken>();
            services.AddScoped<IAuthenticateUser, AuthenticateUser>();
            services.AddScoped<IGenerateRefreshToken, GenerateRefreshToken>();
            services.AddScoped<IGetPrincipalFromExpiredToken, GetPrincipalFromExpiredToken>();
            services.AddScoped<IGetUserRoles, GetUserRoles>();
            services.AddScoped<ISendEmailConfirmation, SendEmailConfirmation>();

            
            //strava API service
            services.AddScoped<IStravaRequestClient, StravaRequestClient>();
            services.AddScoped<IStravaRequestService, StravaRequestService>();
            services.AddScoped<IStravaRequestClientConfiguration, StravaRequestClientConfiguration>();
            services.AddScoped<IExchangeAuthCodeForToken, ExchangeAuthCodeForToken>();

            //strava services
            services.AddScoped<IGetStravaTokenForUser, GetStravaTokenForUser>();
            services.AddScoped<IAddStravaToken, AddStravaToken>();
            services.AddScoped<IGetSummaryActivityForTimeRange, GetSummaryActivityForTimeRange>();
            services.AddScoped<IGetDetailedActivityById, GetDetailedActivityById>();
            services.AddScoped<IStarSegment, StarSegment>();

            //adapters:
            services.AddScoped<IActivityAdapter, ActivityAdapter>();
            services.AddScoped<ISegmentAdapter, SegmentAdapter>();
        }
    }
}
