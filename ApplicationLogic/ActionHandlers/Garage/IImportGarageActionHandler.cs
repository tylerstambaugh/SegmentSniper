

using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Garage;

public interface IImportGarageActionHandler
{
    Task<ImportGarageRequest.Response> ExecuteAsync(ImportGarageRequest contract);
}

public class ImportGarageRequest
{
    public ImportGarageRequest(string userId)
    {
        UserId = userId;
    }

    public string UserId { get; set; }

    public class Response
    {
        public Response(List<BikeModel> bikes)
        {
            Bikes = bikes;
        }

        public List<BikeModel> Bikes { get; set; }
    }
}