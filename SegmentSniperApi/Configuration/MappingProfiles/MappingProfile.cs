using AutoMapper;
using SegmentSniper.Data.Entities.StravaToken;
using SegmentSniper.Models.Models.Strava.Activity;
using SegmentSniper.Models.Models.Strava.Segment;
using SegmentSniper.Models.Models.Strava.Token;
using StravaApiClient.Models.Activity;
using StravaApiClient.Models.Segment;

namespace SegmentSniper.Api.Configuration.MappingProfiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            DestinationMemberNamingConvention = new PascalCaseNamingConvention();


            CreateMap<StravaApiTokenModel, StravaApiToken>()
                .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => src.RefreshToken))
                .ForMember(dest => dest.ExpiresAt, opt => opt.MapFrom(src => src.ExpiresAt))
                .ForMember(dest => dest.ExpiresIn, opt => opt.MapFrom(src => src.ExpiresIn));

            //needs fixed somehow
            //CreateMap<DetailedSegmentEffortApiModel, DetailedSegmentEffort>()
            //    .ForMember(dest => dest.SegmentEffortId, opt => opt.MapFrom(src => src.id))
            //    .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.activity_id))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
            //    .ForMember(dest => dest.ElapsedTime, opt => opt.MapFrom(src => src.elapsed_time))
            //    .ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.moving_time))
            //    .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.start_date))
            //    .ForMember(dest => dest.StartDateLocal, opt => opt.MapFrom(src => src.start_date_local))
            //    .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.distance))
            //    .ForMember(dest => dest.StartIndex, opt => opt.MapFrom(src => src.start_index))
            //    .ForMember(dest => dest.EndIndex, opt => opt.MapFrom(src => src.end_index))
            //    .ForMember(dest => dest.DeviceWatts, opt => opt.MapFrom(src => src.device_watts))
            //    .ForMember(dest => dest.AverageWatts, opt => opt.MapFrom(src => src.average_watts))
            //    .ForMember(dest => dest.AverageHeartrate, opt => opt.MapFrom(src => src.average_heartrate))
            //    .ForMember(dest => dest.MaxHeartrate, opt => opt.MapFrom(src => src.max_heartrate))
            //    .ForMember(dest => dest.Segment, opt => opt.MapFrom(src => src.segment))
            //    .ForMember(dest => dest.PrRank, opt => opt.MapFrom(src => src.pr_rank))
            //    .ForMember(dest => dest.Achievements, opt => opt.MapFrom(src => src.achievements));

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
                .ForMember(dest => dest.SegmentEfforts, opt => opt.MapFrom(src => src.SegmentEfforts))
                .ForMember(dest => dest.PrivateNote, opt => opt.MapFrom(src => src.PrivateNote))
                .ForMember(dest => dest.AvailableZones, opt => opt.MapFrom(src => src.AvailableZones));

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

            //needs fixed somehow
            //CreateMap<DetailedSegmentEffortApiModel, DetailedSegmentEffort>()
            //   .ForMember(dest => dest.SegmentEffortId, opt => opt.MapFrom(src => src.id))
            //   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
            //   .ForMember(dest => dest.ElapsedTime, opt => opt.MapFrom(src => src.elapsed_time))
            //   .ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.moving_time))
            //   .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.start_date))
            //   .ForMember(dest => dest.StartDateLocal, opt => opt.MapFrom(src => src.start_date_local))
            //   .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.distance))
            //   .ForMember(dest => dest.StartIndex, opt => opt.MapFrom(src => src.start_index))
            //   .ForMember(dest => dest.EndIndex, opt => opt.MapFrom(src => src.end_index))
            //   .ForMember(dest => dest.DeviceWatts, opt => opt.MapFrom(src => src.device_watts))
            //   .ForMember(dest => dest.AverageWatts, opt => opt.MapFrom(src => src.average_watts))
            //   .ForMember(dest => dest.AverageHeartrate, opt => opt.MapFrom(src => src.average_heartrate))
            //   .ForMember(dest => dest.MaxHeartrate, opt => opt.MapFrom(src => src.max_heartrate))
            //   .ForMember(dest => dest.Segment, opt => opt.MapFrom(src => src.segment))
            //   .ForMember(dest => dest.PrRank, opt => opt.MapFrom(src => src.pr_rank))
            //   .ForMember(dest => dest.Achievements, opt => opt.MapFrom(src => src.achievements))
            //   .ForMember(dest => dest.Hidden, opt => opt.MapFrom(src => src.hidden));

            //needs fixed somehow
            //CreateMap<DetailedSegmentApiModel, DetailedSegment>()
            //    .ForMember(dest => dest.SegmentId, opt => opt.MapFrom(src => src.id))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
            //    .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => src.activity_type))
            //    .ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.distance))
            //    .ForMember(dest => dest.AverageGrade, opt => opt.MapFrom(src => src.average_grade))
            //    .ForMember(dest => dest.MaximumGrade, opt => opt.MapFrom(src => src.maximum_grade))
            //    .ForMember(dest => dest.ElevationHigh, opt => opt.MapFrom(src => src.elevation_high))
            //    .ForMember(dest => dest.ElevationLow, opt => opt.MapFrom(src => src.elevation_low))
            //    .ForMember(dest => dest.StartLatlng, opt => opt.MapFrom(src => src.start_latlng))
            //    .ForMember(dest => dest.EndLatlng, opt => opt.MapFrom(src => src.end_latlng))
            //    .ForMember(dest => dest.ElevationProfile, opt => opt.MapFrom(src => src.elevation_profile))
            //    .ForMember(dest => dest.ClimbCategory, opt => opt.MapFrom(src => src.climb_category))
            //    .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.city))
            //    .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.state))
            //    .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.country))
            //    .ForMember(dest => dest.Private, opt => opt.MapFrom(src => src.@private))
            //    .ForMember(dest => dest.Hazardous, opt => opt.MapFrom(src => src.hazardous))
            //    .ForMember(dest => dest.Starred, opt => opt.MapFrom(src => src.starred))
            //    .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.created_at))
            //    .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.updated_at))
            //    .ForMember(dest => dest.TotalElevationGain, opt => opt.MapFrom(src => src.total_elevation_gain))
            //    .ForMember(dest => dest.Map, opt => opt.MapFrom(src => src.map))
            //    .ForMember(dest => dest.EffortCount, opt => opt.MapFrom(src => src.effort_count))
            //    .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.athlete_count))
            //    .ForMember(dest => dest.StarCount, opt => opt.MapFrom(src => src.star_count))
            //    .ForMember(dest => dest.AthleteSegmentStats, opt => opt.MapFrom(src => src.athlete_segment_stats))
            //    .ForMember(dest => dest.Xoms, opt => opt.MapFrom(src => src.xoms))
            //    .ForMember(dest => dest.LocalLegend, opt => opt.MapFrom(src => (LocalLegend)null));

            CreateMap<SummaryActivityApiModel, SummaryActivity>();

            //CreateMap<SummarySegmentApiModel, SummarySegment>();     

            //CreateMap<AthleteSegmentStatsApiModel, AthleteSegmentStats>();

            CreateMap<AchievementApiModel, Achievement>()
            .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.type_id))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.type))
            .ForMember(dest => dest.Rank, opt => opt.MapFrom(src => src.rank));

        }
    }
}
