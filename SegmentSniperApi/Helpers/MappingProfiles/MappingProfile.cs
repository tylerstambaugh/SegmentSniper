using AutoMapper;
using SegmentSniper.Data.Entities.StravaToken;
using SegmentSniper.Models.Models.Strava.Token;

namespace SegmentSniper.Api.Helpers.MappingProfiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            DestinationMemberNamingConvention = new PascalCaseNamingConvention();

            CreateMap<StravaApiTokenModel, StravaApiToken>();
        }
    }
}
