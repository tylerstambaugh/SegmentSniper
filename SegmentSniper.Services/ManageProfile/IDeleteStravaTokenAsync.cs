using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IDeleteStravaTokenAsync : IExecutableServiceAsync<DeleteStravaTokenContract, DeleteStravaTokenContract.Result>
    {
        Task<DeleteStravaTokenContract.Result> ExecuteAsync(DeleteStravaTokenContract contract);
    }

    public class DeleteStravaTokenContract
    {
        public DeleteStravaTokenContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get;  }
        }
    }
}