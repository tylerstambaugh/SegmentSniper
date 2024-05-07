using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.ManageProfile
{
    public interface IDeleteAccountAsync : IExecutableServiceAsync<DeleteAccountAsyncContract, DeleteAccountAsyncContract.Result>
    {
       Task <DeleteAccountAsyncContract.Result> ExecuteAsync(DeleteAccountAsyncContract contract);
    }

    public class DeleteAccountAsyncContract
    {
        public DeleteAccountAsyncContract(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
        public class Result
        {
            public Result(bool success)
            {
                Success = success;
            }

            public bool Success { get; set; }
        }
    }
}