using GraphQL.Types;
using SegmentSniper.ApplicationLogic.ActionHandlers.Garage;
using SegmentSniper.ApplicationLogic.ActionHandlers.ManageProfile;
using SegmentSniper.ApplicationLogic.ActionHandlers.SegmentPrediction;
using SegmentSniper.ApplicationLogic.ActionHandlers.Sniper;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaApiToken;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.EventHandlers;
using SegmentSniper.ApplicationLogic.ActionHandlers.StravaWebhook.Factory;
using SegmentSniper.ApplicationLogic.ActionHandlers.User;
using SegmentSniper.GraphQL;
using SegmentSniper.MachineLearning;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Common.Adapters;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.Garage.Equipment;
using SegmentSniper.Services.MachineLearning;
using SegmentSniper.Services.ManageProfile;
using SegmentSniper.Services.StravaToken;
using SegmentSniper.Services.StravaTokenServices;
using SegmentSniper.Services.StravaWebhook;
using SegmentSniper.Services.User;
using StravaApiClient;
using StravaApiClient.Configuration;
using StravaApiClient.Services;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Gear;
using StravaApiClient.Services.Segment;
using StravaApiClient.Services.Webhook;

namespace SegmentSniper.Api.Configuration
{
    public static class ServiceRegistrations
    {
        public static void RegisterServices(IServiceCollection services)
        {

            //graphql
            services.AddScoped<ISchema, GraphQlSchema>();

            // auth action handlers
            services.AddScoped<ICheckForStravaTokenActionHandler, CheckForStravaTokenActionHandler>();
            services.AddScoped<IGetAppUserByAuthUserIdActionHandler, GetAppUserByAuthUserIdActionHandler>();
            services.AddScoped<IAddAppUserActionHandler, AddAppUserActionHandler>();

            //strava action handlers
            services.AddScoped<IAddAppUserActionHandler, AddAppUserActionHandler>();
            services.AddScoped<IGetActivityListActionHandler, GetActivityListActionHandler>();
            services.AddScoped<IGetDetailedActivityByIdActionHandler, GetDetailedActivityByIdActionHandler>();
            services.AddScoped<ISnipeSegmentsActionHandler, SnipeSegmentsActionHandler>();
            services.AddScoped<IExchangeAuthCodeForTokenHandler, ExchangeAuthCodeForTokenHandler>();
            services.AddScoped<IGetDetailedSegmentBySegmentIdActionHandler, GetDetailedSegmentBySegmentIdActionHandler>();
            services.AddScoped<IStarSegmentActionHandler, StarSegmentActionHandler>();
            services.AddScoped<IGetSnipeSegmentsByActivityIdActionHandler, GetSnipeSegmentsByActivityIdActionHandler>();

            //strava webhook action handlers
            services.AddScoped<ICreateStravaWebhookSubscriptionHandler, CreateStravaWebhookSubscriptionHandler>();
            services.AddScoped<IViewStravaWebhookSubscriptionHandler, ViewStravaWebhookSubscriptionHandler>();
            services.AddScoped<IDeleteStravaWebhookSubscriptionHandler, DeleteStravaWebhookSubscriptionHandler>();

            services.AddScoped<WebhookEventHandlerFactory>();
            services.AddTransient<CreateWebhookEventHandler>();
            services.AddTransient<UpdateWebhookEventHandler>();
            services.AddTransient<DeleteWebhookEventHandler>();

            //profile action handlers            
            services.AddScoped<IRevokeStravaTokenAsyncActionHandler, RevokeStravaTokenAsyncActionHandler>();
            services.AddScoped<IGetAppUserByAuthId, GetAppUserByAuthId>();
            services.AddScoped<IAddAppUser, AddAppUser>();


            //segment prediction action handlers
            services.AddScoped<ISegmentPredictionActionHandler, SegmentPredictionActionHandler>();
            services.AddScoped<IGetSegmentPredictionTrainedModelMetaDataActionHandler, GetSegmentPredictionTrainedModelMetaDataActionHandler>();
            services.AddScoped<ITrainSegmentPredictionModelActionHandler, TrainSegmentPredictionModelActionHandler>();

            
            //garage actionhandlers
            services.AddScoped<IImportGarageActionHandler, ImportGarageActionHandler>();
            services.AddScoped<IGetBikesByUserIdActionHandler, GetBikesByUserIdActionHandler>();

            //profile services            
            services.AddScoped<IDeleteStravaTokenAsync, DeleteStravaTokenAsync>();

            //admin services
            //services.AddScoped<IRemoveUser, RemoveUser>();
            //services.AddScoped<IGetUsers, GetUsers>();

            //user services
            services.AddScoped<IGetUserByStravaAthleteId, GetUserByStravaAthleteId>();

            //common & helper services
            services.AddScoped<ISendEmail, SendEmail>();

            //strava API service
            services.AddScoped<IStravaRequestClient, StravaRequestClient>();
            services.AddScoped<IStravaRequestService, StravaRequestService>();
            services.AddScoped<IStravaRequestClientConfiguration, StravaRequestClientConfiguration>();
            services.AddScoped<IExchangeAuthCodeForToken, ExchangeAuthCodeForToken>();

            //strava webhook services
            services.AddScoped<ISaveStravaWebhookSubscriptionId, SaveStravaWebhookSubscriptionId>();
            services.AddScoped<ICreateStravaWebhookSubscription, CreateStravaWebhookSubscription>();
            services.AddScoped<IViewStravaWebhookSubscription, ViewStravaWebhookSubscription>();
            services.AddScoped<IDeleteStravaWebhookSubscription, DeleteStravaWebhookSubscription>();
            services.AddScoped<IGetStravaWebhookSubscriptionId, GetStravaWebhookSubscriptionId>();

            //strava services
            services.AddScoped<IAddAppUser, AddAppUser>();
            services.AddScoped<IGetStravaTokenForUser, GetStravaTokenForUser>();
            services.AddScoped<IUpdateStravaTokenForUser, UpdateStravaTokenForUser>();
            services.AddScoped<IAddStravaToken, AddStravaToken>();
            services.AddScoped<IGetSummaryActivityForTimeRange, GetSummaryActivityForTimeRange>();
            services.AddScoped<IGetDetailedActivityById, GetDetailedActivityById>();
            services.AddScoped<IStarSegment, StarSegment>();
            services.AddScoped<IGetGearById, GetGearById>();
            
            services.AddScoped<IDeleteStravaWebhookSubscriptionService, DeleteStravaWebhookSubscriptionService>();

            //ML Services
            services.AddScoped<IGetSegmentPredictionTrainingData, GetSegmentPredictionTrainingData>();
            services.AddScoped<IGetSegmentPredictionModel, GetSegmentPredictionModel>();
            services.AddScoped<ISaveSegmentPredictionModel, SaveSegmentPredictionModel>();
            services.AddScoped<ISaveSegmentPredictionTrainingData, SaveSegmentPredictionTrainingData>();
            services.AddScoped<ISegmentPredictionDataProcessor, SegmentPredictionDataProcessor>();
            services.AddScoped<ISaveSegmentPredictionRegressionMetrics, SaveSegmentPredictionRegressionMetrics>();
            services.AddScoped<IDeleteMLSegmentEffortsById, DeleteMLSegmentEffortsById>();
            services.AddScoped<IDeleteMLSegmentEffortsByActivityId, DeleteMLSegmentEffortsByActivityId>();

            //Garage Services
            services.AddScoped<IGetBikeById, GetBikeById>();
            services.AddScoped<IGetAllBikesByUserId, GetAllBikesByUserId>();
            services.AddScoped<IUpsertBike, UpsertBike>();
            services.AddScoped<IAddBikeActivity, AddBikeActivity>();
            services.AddScoped<IGetAllBikeActivitiesByBikeId, GetAllBikeActivitiesByBikeId>();
            services.AddScoped<IGetAllBikeActivitiesByUserId, GetAllBikeActivitiesByUserId>();
            services.AddScoped<IImportGarage, ImportGarage>();
            services.AddScoped<IUpsertBikeEquipment, UpsertBikeEquipment>();
            services.AddScoped<IRetireBikeEquipment, RetireBikeEquipment>();
            services.AddScoped<IDeleteEquipment, DeleteEquipment>();
            services.AddScoped<IDeleteBike, DeleteBike>();
            services.AddScoped<IDeleteBikeActivity, DeleteBikeActivity>();
            services.AddScoped<IBikeActivityQueuePublisher, BikeActivityQueuePublisher>();

            //adapters:
            services.AddScoped<IActivityAdapter, ActivityAdapter>();
            services.AddScoped<ISegmentAdapter, SegmentAdapter>();

            services.AddSingleton<IBikeActivityQueuePublisher, BikeActivityQueuePublisher>();
        }
    }
}
