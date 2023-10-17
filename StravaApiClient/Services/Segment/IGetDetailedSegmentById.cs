namespace StravaApiClient.Services.Segment
{
    public interface IGetDetailedSegmentById
    {
        Task<GetDetailedSegmentByIdContract.Result> ExecuteAsync(GetDetailedSegmentByIdContract contract);
    }


}