﻿using GraphQL.Types;
using SegmentSniper.Api.ActionHandlers.AdminActionHandlers;
using SegmentSniper.Api.ActionHandlers.AuthActionHandlers;
using SegmentSniper.Api.ActionHandlers.LoginActionHandlers;
using SegmentSniper.Api.ActionHandlers.ManageProfileActionHandlers;
using SegmentSniper.Api.ActionHandlers.SegmentPredictionActionHandlers;
using SegmentSniper.Api.ActionHandlers.SniperActionHandlers;
using SegmentSniper.Api.ActionHandlers.StravaApiToken;
using SegmentSniper.ApplicationLogic.ActionHandlers.GarageActionHandlers;
using SegmentSniper.GraphQL;
using SegmentSniper.MachineLearning;
using SegmentSniper.Services.Admin;
using SegmentSniper.Services.AuthServices;
using SegmentSniper.Services.AuthServices.Token;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Common.Adapters;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.Garage.Equipment;
using SegmentSniper.Services.MachineLearning;
using SegmentSniper.Services.ManageProfile;
using SegmentSniper.Services.StravaToken;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient;
using StravaApiClient.Configuration;
using StravaApiClient.Services;
using StravaApiClient.Services.Activity;
using StravaApiClient.Services.Gear;
using StravaApiClient.Services.Segment;

namespace SegmentSniper.Api.Configuration
{
    public static class ServiceRegistrations
    {
        public static void RegisterServices(IServiceCollection services)
        {

            //graphql
            services.AddScoped<ISchema, GraphQlSchema>();

            // auth action handlers
            services.AddScoped<ILoginUserActionHandler, LoginUserActionHandler>();
            services.AddScoped<IRegisterUserActionHandler, RegisterUserActionHandler>();
            services.AddScoped<IRevokeTokenActionHandler, RevokeTokenActionHandler>();
            services.AddScoped<IRefreshTokenActionHandler, RefreshTokenActionHandler>();
            services.AddScoped<ICheckForStravaTokenActionHandler, CheckForStravaTokenActionHandler>();
            services.AddScoped<IConfirmEmailActionHandler, ConfirmEmailActionHandler>();
            services.AddScoped<ISendEmailConfirmationActionHandler, SendEmailConfirmationActionHandler>();
            services.AddScoped<ISendResetPasswordEmailActionHandler, SendResetPasswordEmailActionHandler>();
            services.AddScoped<IResetPasswordActionHandler, ResetPasswordActionHandler>();

            //strava action handlers
            services.AddScoped<IGetActivityListActionHandler, GetActivityListActionHandler>();
            services.AddScoped<IGetDetailedActivityByIdActionHandler, GetDetailedActivityByIdActionHandler>();
            services.AddScoped<ISnipeSegmentsActionHandler, SnipeSegmentsActionHandler>();
            services.AddScoped<IExchangeAuthCodeForTokenHandler, ExchangeAuthCodeForTokenHandler>();
            services.AddScoped<IGetDetailedSegmentBySegmentIdActionHandler, GetDetailedSegmentBySegmentIdActionHandler>();
            services.AddScoped<IStarSegmentActionHandler, StarSegmentActionHandler>();
            services.AddScoped<IGetSnipeSegmentsByActivityIdActionHandler, GetSnipeSegmentsByActivityIdActionHandler>();

            //profile action handlers
            services.AddScoped<IGetProfileActionHandler, GetProfileActionHandler>();
            services.AddScoped<IUpdateFirstNameAsyncActionHandler, UpdateFirstNameAsyncActionHandler>();
            services.AddScoped<IUpdatePasswordAsyncActionHandler, UpdatePasswordAsyncActionHandler>();
            services.AddScoped<IUpdateEmailAddressAsyncActionHandler, UpdateEmailAddressAsyncActionHandler>();
            services.AddScoped<IRequestChangeEmailVerificationCodeAsyncActionHandler, RequestChangeEmailVerificationCodeAsyncActionHandler>();
            services.AddScoped<IRevokeStravaTokenAsyncActionHandler, RevokeStravaTokenAsyncActionHandler>();
            services.AddScoped<IDeleteProfileActionHandlerAsync, DeleteProfileActionHandlerAsync>();

            //segment prediction action handlers
            services.AddScoped<ISegmentPredictionActionHandler, SegmentPredictionActionHandler>();
            services.AddScoped<IGetSegmentPredictionTrainedModelMetaDataActionHandler, GetSegmentPredictionTrainedModelMetaDataActionHandler>();
            services.AddScoped<ITrainSegmentPredictionModelActionHandler, TrainSegmentPredictionModelActionHandler>();

            ////admin action handlers
            services.AddScoped<IGetUsersActionHandler, GetUsersActionHandler>();
            services.AddScoped<IRemoveUserActionHandler, RemoveUserActionHandler>();

            //garage actionhandlers
            services.AddScoped<IImportGarageActionHandler, ImportGarageActionHandler>();
            services.AddScoped<IGetBikesByUserIdActionHandler, GetBikesByUserIdActionHandler>();

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
            services.AddScoped<IConfirmEmail, ConfirmEmail>();
            services.AddScoped<ISendPasswordResetEmail, SendPasswordResetEmail>();
            services.AddScoped<ISendPasswordWasResetEmail, SendPasswordWasResetEmail>();
            services.AddScoped<IResetPassword, ResetPassword>();
            services.AddScoped<IGetAuthenticatedUser, GetAuthenticatedUser>();

            //profile services
            services.AddScoped<IGetProfile, GetProfile>();
            services.AddScoped<IUpdateFirstNameAsync, UpdateFirstNameAsync>();
            services.AddScoped<IUpdatePasswordAsync, UpdatePasswordAsync>();
            services.AddScoped<IUpdateEmailAddressAsync, UpdateEmailAddressAsync>();
            services.AddScoped<IGenerateVerificationCodeForEmailAddressChange, GenerateVerificationCodeForEmailAddressChange>();
            services.AddScoped<IVerifyCodeForEmailAddressChange, VerifyCodeForEmailAddressChange>();
            services.AddScoped<IDeleteStravaTokenAsync, DeleteStravaTokenAsync>();

            //admin services
            services.AddScoped<IRemoveUser, RemoveUser>();
            services.AddScoped<IGetUsers, GetUsers>();

            //common & helper services
            services.AddScoped<ISendEmail, SendEmail>();

            //strava API service
            services.AddScoped<IStravaRequestClient, StravaRequestClient>();
            services.AddScoped<IStravaRequestService, StravaRequestService>();
            services.AddScoped<IStravaRequestClientConfiguration, StravaRequestClientConfiguration>();
            services.AddScoped<IExchangeAuthCodeForToken, ExchangeAuthCodeForToken>();

            //strava services
            services.AddScoped<IGetStravaTokenForUser, GetStravaTokenForUser>();
            services.AddScoped<IUpdateStravaTokenForUser, UpdateStravaTokenForUser>();
            services.AddScoped<IAddStravaToken, AddStravaToken>();
            services.AddScoped<IGetSummaryActivityForTimeRange, GetSummaryActivityForTimeRange>();
            services.AddScoped<IGetDetailedActivityById, GetDetailedActivityById>();
            services.AddScoped<IStarSegment, StarSegment>();
            services.AddScoped<IGetGearById,  GetGearById>();

            //ML Services
            services.AddScoped<IGetSegmentPredictionTrainingData, GetSegmentPredictionTrainingData>();
            services.AddScoped<IGetSegmentPredictionModel, GetSegmentPredictionModel>();
            services.AddScoped<ISaveSegmentPredictionModel, SaveSegmentPredictionModel>();
            services.AddScoped<ISaveSegmentPredictionTrainingData, SaveSegmentPredictionTrainingData>();
            services.AddScoped<ISegmentPredictionDataProcessor, SegmentPredictionDataProcessor>();
            services.AddScoped<ISaveSegmentPredictionRegressionMetrics, SaveSegmentPredictionRegressionMetrics>();

            //Garage Services
            services.AddScoped<IGetBikeById, GetBikeById>();
            services.AddScoped<IGetAllBikesByUserId, GetAllBikesByUserId>();
            services.AddScoped<IUpsertBike, UpsertBike>();
            services.AddScoped<IAddBikeActivity, AddBikeActivity>();
            services.AddScoped<IGetAllBikeActivitiesByBikeId, GetAllBikeActivitiesByBikeId>();
            services.AddScoped<IGetAllBikeActivitiesByUserId, GetAllBikeActivitiesByUserId>();
            services.AddScoped<IImportGarage,  ImportGarage>();
            services.AddScoped<IUpsertBikeEquipment, UpsertBikeEquipment>();
            services.AddScoped<IRetireBikeEquipment, RetireBikeEquipment>();
            services.AddScoped<IDeleteEquipment, DeleteEquipment>();
            services.AddScoped<IDeleteBike, DeleteBike>();

            //adapters:
            services.AddScoped<IActivityAdapter, ActivityAdapter>();
            services.AddScoped<ISegmentAdapter, SegmentAdapter>();
        }
    }
}
