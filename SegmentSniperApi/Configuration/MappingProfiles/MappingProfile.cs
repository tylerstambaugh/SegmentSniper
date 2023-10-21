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


            CreateMap<StravaApiTokenModel, StravaApiToken>();
            CreateMap<DetailedSegmentEffortApiModel, DetailedSegmentEffort>()
            .ForMember(dest => dest.SegmentEffortId, opt => opt.MapFrom(src => src.id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.name))
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
            .ForMember(dest => dest.Segment, opt => opt.MapFrom(src => src.segment))
            .ForMember(dest => dest.PrRank, opt => opt.MapFrom(src => src.pr_rank))
            .ForMember(dest => dest.Achievements, opt => opt.MapFrom(src => src.achievements))
            .ReverseMap(); // If you need to map in reverse as well
            CreateMap<DetailedActivityApiModel, DetailedActivity>();
            CreateMap<DetailedActivityApiModel, SummaryActivity>();
            CreateMap<DetailedSegmentEffortApiModel, DetailedSegmentEffort>();
            CreateMap<DetailedSegmentApiModel, DetailedSegment>();
            CreateMap<DetailedActivityApiModel, SummaryActivity>();

            //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //.ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
            //.ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
            //.ForMember(dest => dest.Distance, opt => opt.MapFrom(src => src.Distance))
            //.ForMember(dest => dest.MovingTime, opt => opt.MapFrom(src => src.MovingTime))
            //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.id))
            //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.id))
            //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.id))
            //.
        }
    }
}
