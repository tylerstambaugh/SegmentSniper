using AutoMapper;
using SegmentSniper.Data.Entities.StravaToken;
using SegmentSniper.Models.Models.Strava.Token;
using StravaApiClient.Models.Activity;

namespace SegmentSniper.Api.Configuration.MappingProfiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            DestinationMemberNamingConvention = new PascalCaseNamingConvention();

            CreateMap<StravaApiTokenModel, StravaApiToken>();
            CreateMap<StravaApiToken, StravaApiTokenModel>();

            CreateMap<DetailedActivityApiModel, SummaryActivityModel>()
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
