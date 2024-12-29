namespace SegmentSniper.Services.Garage
{
    public interface IUpdateGarage
    {
        Task<UpdateGarageContract.Result> ExecuteAsync(UpdateGarageContract contract);
    }

    public class UpdateGarageContract
    {
        public UpdateGarageContract(string userId)
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

            public bool Success { get; set; }
        }
    }
}