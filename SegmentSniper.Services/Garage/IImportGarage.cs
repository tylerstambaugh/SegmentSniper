using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public interface IImportGarage
    {
        Task<ImportGarageContract.Result> ExecuteAsync(ImportGarageContract contract);
    }

    public class ImportGarageContract
    {
        public ImportGarageContract(string userId, List<BikeModel> bikes)
        {
            UserId = userId;

            Bikes = bikes;
        }

        public string UserId { get; }
        public List<BikeModel> Bikes { get; set; }

        public class Result
        {
            public Result(List<BikeModel> bikes)
            {
                Bikes = bikes;
            }

            public List<BikeModel> Bikes { get; set; }
        }
    }
}