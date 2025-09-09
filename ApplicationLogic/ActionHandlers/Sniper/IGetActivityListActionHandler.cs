using SegmentSniper.Models.UIModels.Activity;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Sniper
{
    public interface IGetActivityListActionHandler
    {
        Task<GetActivityListRequest.Response> HandleAsync(GetActivityListRequest request);
    }

    public class GetActivityListRequest
    {
        public GetActivityListRequest()
        {
            
        }
        public GetActivityListRequest(string? activityName, string activityType, DateTime? endDate, DateTime? startDate)
        {
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
            ActivityName = activityName;
        }

        public GetActivityListRequest(string userId, DateTime startDate, DateTime endDate, string activityType, string activityName)
        {
            UserId = userId;
            StartDate = startDate;
            EndDate = endDate;
            ActivityType = activityType;
            ActivityName = activityName;
        }


        public string? UserId { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? ActivityType { get; set; }
        public string? ActivityName { get; set; }

        public class Response
        {
            public List<ActivityListModel> ActivityList { get; set; }
        }
    }

    public class DaysAndPagesContract
    {
        public DaysAndPagesContract(DateTime? startDate, DateTime? endDate)
        {
            StartDate = startDate;
            EndDate = endDate;
        }

        public DateTime? StartDate { get; }
        public DateTime? EndDate { get; }

        public class Result
        {
            public int StartDateUnix { get; set; }
            public int EndDateUnix { get; set;}
        }
    }
}