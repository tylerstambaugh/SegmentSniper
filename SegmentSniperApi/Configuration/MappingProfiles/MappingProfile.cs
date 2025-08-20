using AutoMapper;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Data.Entities.Segments;
using SegmentSniper.Data.Entities.User;
using SegmentSniper.Models.Garage;
using SegmentSniper.Models.MachineLearning;
using SegmentSniper.Models.Strava.Activity;
using SegmentSniper.Models.Strava.Athlete;
using SegmentSniper.Models.Strava.Misc;
using SegmentSniper.Models.Strava.Segment;
using SegmentSniper.Models.Strava.Token;
using SegmentSniper.Models.Strava.Webhook;
using SegmentSniper.Models.UIModels.MachineLearning;
using SegmentSniper.Models.UIModels.Segment;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Athlete;
using StravaApiClient.Models.Misc;
using StravaApiClient.Models.Segment;
using StravaApiClient.Models.Token;
using StravaApiClient.Models.Webhook;

namespace SegmentSniper.Api.Configuration.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            DestinationMemberNamingConvention = new PascalCaseNamingConvention();


            CreateMap<StravaTokenApiModel, StravaTokenModel>()
                .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => src.RefreshToken))
                .ForMember(dest => dest.ExpiresAt, opt => opt.MapFrom(src => src.ExpiresAt))
                .ForMember(dest => dest.ExpiresIn, opt => opt.MapFrom(src => src.ExpiresIn))
                .ForMember(dest => dest.StravaAthlete, opt => opt.MapFrom(src => src.StravaApiAthlete))
                .ReverseMap();

            CreateMap<User, StravaTokenModel>()
               .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => src.StravaRefreshToken))
               .ForMember(dest => dest.ExpiresAt, opt => opt.MapFrom(src => src.StravaTokenExpiresAt))
               .ForMember(dest => dest.ExpiresIn, opt => opt.MapFrom(src => src.StravaTokenExpiresIn))
               .ReverseMap();

            CreateMap<ViewSubscriptionApiResponse, ViewSubscriptionResponseModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CallbackUrl, opt => opt.MapFrom(src => src.CallbackUrl))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt))
                .ForMember(dest => dest.ResourceState, opt => opt.MapFrom(src => src.ResourceState))
                .ForMember(dest => dest.ApplicationId, opt => opt.MapFrom(src => src.ApplicationId));


            CreateMap<StravaAthleteApiModel, StravaAthleteModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Firstname, opt => opt.MapFrom(src => src.Firstname))
                .ForMember(dest => dest.Lastname, opt => opt.MapFrom(src => src.Lastname))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country))
                .ForMember(dest => dest.ProfileMedium, opt => opt.MapFrom(src => src.ProfileMedium))
                .ForMember(dest => dest.Profile, opt => opt.MapFrom(src => src.Profile))
                .ForMember(dest => dest.ResourceState, opt => opt.MapFrom(src => src.ResourceState))
                .ReverseMap();

            CreateMap<DetailedActivityApiModel, DetailedActivity>()
                .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
                .ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.MovingTime))
                .ForMember(dest => dest.ElapsedTime, opt => opt.MapFrom(src => src.ElapsedTime))
                .ForMember(dest => dest.TotalElevationGain, opt => opt.MapFrom(src => src.TotalElevationGain))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.SportType, opt => opt.MapFrom(src => src.SportType))
                .ForMember(dest => dest.WorkoutType, opt => opt.MapFrom(src => src.WorkoutType))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.StartDateLocal, opt => opt.MapFrom(src => src.StartDateLocal))
                .ForMember(dest => dest.Timezone, opt => opt.MapFrom(src => src.Timezone))
                .ForMember(dest => dest.UtcOffset, opt => opt.MapFrom(src => src.UtcOffset))
                .ForMember(dest => dest.LocationCity, opt => opt.MapFrom(src => src.LocationCity))
                .ForMember(dest => dest.LocationState, opt => opt.MapFrom(src => src.LocationState))
                .ForMember(dest => dest.LocationCountry, opt => opt.MapFrom(src => src.LocationCountry))
                .ForMember(dest => dest.AchievementCount, opt => opt.MapFrom(src => src.AchievementCount))
                .ForMember(dest => dest.KudosCount, opt => opt.MapFrom(src => src.KudosCount))
                .ForMember(dest => dest.CommentCount, opt => opt.MapFrom(src => src.CommentCount))
                .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.AthleteCount))
                .ForMember(dest => dest.PhotoCount, opt => opt.MapFrom(src => src.PhotoCount))
                .ForMember(dest => dest.Map, opt => opt.MapFrom(src => src.Map))
                .ForMember(dest => dest.Trainer, opt => opt.Ignore())
                .ForMember(dest => dest.Commute, opt => opt.Ignore())
                .ForMember(dest => dest.Manual, opt => opt.Ignore())
                .ForMember(dest => dest.Private, opt => opt.MapFrom(src => src.IsPrivate))
                .ForMember(dest => dest.Visibility, opt => opt.MapFrom(src => src.Visibility))
                .ForMember(dest => dest.StartLatlng, opt => opt.MapFrom(src => src.StartLatLng))
                .ForMember(dest => dest.EndLatlng, opt => opt.MapFrom(src => src.EndLatLng))
                .ForMember(dest => dest.AverageSpeed, opt => opt.MapFrom(src => src.AverageSpeed))
                .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => src.MaxSpeed))
                .ForMember(dest => dest.AverageWatts, opt => opt.MapFrom(src => src.AverageWatts))
                .ForMember(dest => dest.Kilojoules, opt => opt.MapFrom(src => src.Kilojoules))
                .ForMember(dest => dest.DeviceWatts, opt => opt.MapFrom(src => src.DeviceWatts))
                .ForMember(dest => dest.HasHeartrate, opt => opt.MapFrom(src => src.HasHeartRate))
                .ForMember(dest => dest.AverageHeartrate, opt => opt.MapFrom(src => src.AverageHeartRate))
                .ForMember(dest => dest.MaxHeartrate, opt => opt.MapFrom(src => src.MaxHeartRate))
                .ForMember(dest => dest.ElevHigh, opt => opt.MapFrom(src => src.ElevationHigh))
                .ForMember(dest => dest.ElevLow, opt => opt.MapFrom(src => src.ElevationLow))
                .ForMember(dest => dest.PrCount, opt => opt.MapFrom(src => src.PrCount))
                .ForMember(dest => dest.TotalPhotoCount, opt => opt.MapFrom(src => src.TotalPhotoCount))
                .ForMember(dest => dest.HasKudoed, opt => opt.MapFrom(src => src.HasKudoed))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Calories, opt => opt.MapFrom(src => src.Calories))
                .ForMember(dest => dest.PerceivedExertion, opt => opt.MapFrom(src => src.PerceivedExertion))
                .ForMember(dest => dest.PreferPerceivedExertion, opt => opt.MapFrom(src => src.PreferPerceivedExertion))
                .ForMember(dest => dest.SegmentEfforts, opt => opt.MapFrom(src => src.SegmentEfforts))
                .ForMember(dest => dest.PrivateNote, opt => opt.MapFrom(src => src.PrivateNote))
                .ForMember(dest => dest.AvailableZones, opt => opt.MapFrom(src => src.AvailableZones))
                .ForMember(dest => dest.SummaryGear, opt => opt.MapFrom(src => src.Gear));


            CreateMap<DetailedActivityApiModel, SummaryActivity>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => (float)src.Distance))
                .ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.MovingTime))
                .ForMember(dest => dest.ElapsedTime, opt => opt.MapFrom(src => src.ElapsedTime))
                .ForMember(dest => dest.AverageSpeed, opt => opt.MapFrom(src => (float)src.AverageSpeed))
                .ForMember(dest => dest.MaxSpeed, opt => opt.MapFrom(src => (float)src.MaxSpeed))
                .ForMember(dest => dest.ElevationGain, opt => opt.MapFrom(src => (float)src.TotalElevationGain))
                .ForMember(dest => dest.AchievementCount, opt => opt.MapFrom(src => src.AchievementCount))
                .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.AthleteCount))
                .ForMember(dest => dest.Map, opt => opt.MapFrom(src => src.Map));
                


            CreateMap<DetailedSegmentApiModel, DetailedSegment>()
                .ForMember(dest => dest.SegmentId, opt => opt.MapFrom(src => src.id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
                .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => src.activity_type))
                .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.distance))
                .ForMember(dest => dest.AverageGrade, opt => opt.MapFrom(src => src.average_grade))
                .ForMember(dest => dest.MaximumGrade, opt => opt.MapFrom(src => src.maximum_grade))
                .ForMember(dest => dest.ElevationHigh, opt => opt.MapFrom(src => src.elevation_high))
                .ForMember(dest => dest.ElevationLow, opt => opt.MapFrom(src => src.elevation_low))
                .ForMember(dest => dest.StartLatlng, opt => opt.MapFrom(src => src.start_latlng))
                .ForMember(dest => dest.EndLatlng, opt => opt.MapFrom(src => src.end_latlng))
                .ForMember(dest => dest.ElevationProfile, opt => opt.MapFrom(src => src.elevation_profile))
                .ForMember(dest => dest.ClimbCategory, opt => opt.MapFrom(src => src.climb_category))
                .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.city))
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.state))
                .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.country))
                .ForMember(dest => dest.Private, opt => opt.MapFrom(src => src.@private))
                .ForMember(dest => dest.Hazardous, opt => opt.MapFrom(src => src.hazardous))
                .ForMember(dest => dest.Starred, opt => opt.MapFrom(src => src.starred))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.created_at))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.updated_at))
                .ForMember(dest => dest.TotalElevationGain, opt => opt.MapFrom(src => src.total_elevation_gain))
                .ForMember(dest => dest.Map, opt => opt.MapFrom(src => src.map))
                .ForMember(dest => dest.EffortCount, opt => opt.MapFrom(src => src.effort_count))
                .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.athlete_count))
                .ForMember(dest => dest.StarCount, opt => opt.MapFrom(src => src.star_count))
                .ForMember(dest => dest.AthleteSegmentStats, opt => opt.MapFrom(src => src.athlete_segment_stats))
                .ForMember(dest => dest.Xoms, opt => opt.MapFrom(src => src.xoms))
                .ForMember(dest => dest.LocalLegend, opt => opt.MapFrom(src => (LocalLegend)null));

            CreateMap<SummaryActivityApiModel, SummaryActivity>();

            CreateMap<DetailedSegmentEffortApiModel, DetailedSegmentEffort>()
               .ForMember(dest => dest.SegmentEffortId, opt => opt.MapFrom(src => src.id))
               .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.activity_id))
               .ForMember(dest => dest.ElapsedTime, opt => opt.MapFrom(src => src.elapsed_time))
               .ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.moving_time))
               .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.start_date))
               .ForMember(dest => dest.StartDateLocal, opt => opt.MapFrom(src => src.start_date_local))
               .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.distance))
               .ForMember(dest => dest.StartIndex, opt => opt.MapFrom(src => src.start_index))
               .ForMember(dest => dest.EndIndex, opt => opt.MapFrom(src => src.end_index))
               .ForMember(dest => dest.DeviceWatts, opt => opt.MapFrom(src => src.device_watts))
               .ForMember(dest => dest.AverageWatts, opt => opt.MapFrom(src => src.average_watts))
               .ForMember(dest => dest.AverageHeartrate, opt => opt.MapFrom(src => src.average_heartrate))
               .ForMember(dest => dest.MaxHeartrate, opt => opt.MapFrom(src => src.max_heartrate))
               .ForMember(dest => dest.SummarySegment, opt => opt.MapFrom(src => src.segment))
               .ForMember(dest => dest.PrRank, opt => opt.MapFrom(src => src.pr_rank))
               .ForMember(dest => dest.Achievements, opt => opt.MapFrom(src => src.achievements))
               .ForMember(dest => dest.Hidden, opt => opt.MapFrom(src => src.hidden));


            CreateMap<SummarySegmentApiModel, SummarySegment>();
            CreateMap<DetailedSegment, DetailedSegmentUIModel>();

            CreateMap<SummaryGearApiModel, SummaryGear>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Primary, opt => opt.MapFrom(src => src.Primary))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Nickname, opt => opt.MapFrom(src => src.Nickname))
                .ForMember(dest => dest.ResourceState, opt => opt.MapFrom(src => src.ResourceState))
                .ForMember(dest => dest.Retired, opt => opt.MapFrom(src => src.Retired))
                .ForMember(dest => dest.MetersLogged, opt => opt.MapFrom(src => src.Distance));

            CreateMap<AthleteSegmentStatsApiModel, AthleteSegmentStats>();
            CreateMap<AthleteSegmentStats, AthleteSegmentStatsUiModel>();
            

            CreateMap<MapApiModel, MapModel>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.id))
               .ForMember(dest => dest.PolyLine, opt => opt.MapFrom(src => src.polyline))
               .ForMember(dest => dest.SummaryPolyLine, opt => opt.MapFrom(src => src.summary_polyline));

            CreateMap<XomsApiModel, Xoms>();

            CreateMap<AchievementApiModel, Achievement>()
            .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.type_id))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.type))
            .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.rank));

            CreateMap<ML_SegmentEffort, ML_SegmentDataRecord>()
                .ForMember(dest => dest.SegmentPrTime, opt => opt.MapFrom(src => src.SegmentPrTime))
                .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
                .ForMember(dest => dest.AverageGrade, opt => opt.MapFrom(src => src.AverageGrade))
                .ForMember(dest => dest.ElevationGain, opt => opt.MapFrom(src => src.ElevationGain))
                .ForMember(dest => dest.MaximumGrade, opt => opt.MapFrom(src => src.MaximumGrade));

            CreateMap<SegmentPredictionTrainedData, ML_SegmentPredictionModel>();
            CreateMap<SegmentPredictionTrainedData, SegmentPredictionTrainingDataUiModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate))
                .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => src.UpdatedDate))
                .ForMember(dest => dest.NumberOfSegmentsUsedInModelTraining, opt => opt.MapFrom(src => src.NumberOfSegmentsUsedInModelTraining));

            CreateMap<DetailedGearApiModel, BikeModel>()
                 .ForMember(dest => dest.FrameType, opt => opt.MapFrom(src =>
                    Enum.IsDefined(typeof(FrameType), src.FrameType)
                    ? (FrameType)src.FrameType
                    : (FrameType?)null))
                 .ForMember(dest => dest.BikeId, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.MetersLogged, opt => opt.MapFrom(src => src.Distance))
                 .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.Trim()))
                 .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description.Trim()))
                 .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName.Trim()))
                 .ForMember(dest => dest.ModelName, opt => opt.MapFrom(src => src.ModelName.Trim()));


            //Garage Mappings:
            CreateMap<Bike, BikeModel>()
                .ForMember(dest => dest.BikeId, opt => opt.MapFrom(src => src.BikeId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.AuthUserId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.FrameType, opt => opt.MapFrom(src => src.FrameType))
                .ForMember(dest => dest.MetersLogged, opt => opt.MapFrom(src => src.MetersLogged))
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.BrandName))
                .ForMember(dest => dest.ModelName, opt => opt.MapFrom(src => src.ModelName))
                .ForMember(dest => dest.IsPrimary, opt => opt.MapFrom(src => src.IsPrimary))
                .ForMember(dest => dest.Equipment, opt => opt.MapFrom(src => src.Equipment))
                .ReverseMap();

            CreateMap<Equipment, EquipmentModel>()
                .ForMember(dest => dest.EquipmentId, opt => opt.MapFrom(src => src.EquipmentId))
                .ForMember(dest => dest.BikeId, opt => opt.MapFrom(src => src.BikeId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.AuthUserId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.InstallDate, opt => opt.MapFrom(src => src.InstallDate))
                .ForMember(dest => dest.MilesLogged, opt => opt.MapFrom(src => src.MilesLogged))
                .ForMember(dest => dest.ReplaceAtMiles, opt => opt.MapFrom(src => src.ReplaceAtMiles))
                .ForMember(dest => dest.MilesUntilReplaceReminder, opt => opt.MapFrom(src => src.MilesUntilReplaceReminder));

        }
    }
}
