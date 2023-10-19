using StravaApiClient.Models.Segment;

namespace StravaApiClient.Services.Segment
{
    public interface IGetDetailedSegmentById
    {
        Task<GetDetailedSegmentByIdContract.Result> ExecuteAsync(GetDetailedSegmentByIdContract contract);
    }

    public class GetDetailedSegmentByIdContract
    {
        public GetDetailedSegmentByIdContract(string segmentId)
        {
            SegmentId = segmentId;
        }

        public string SegmentId { get; set; }   

        public class Result
        {
            public Result(DetailedSegmentApiModel detailedSegmentApiModel)
            {
                DetailedSegmentApiModel = detailedSegmentApiModel;
            }

            public DetailedSegmentApiModel DetailedSegmentApiModel { get; set; }
        }
    }
}