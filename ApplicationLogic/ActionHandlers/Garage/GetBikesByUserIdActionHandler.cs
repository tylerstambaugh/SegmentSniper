using AutoMapper;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Garage;
using SegmentSniper.Services.Garage;
using SegmentSniper.Services.StravaToken;
using StravaApiClient;
using StravaApiClient.Models.Misc;
using StravaApiClient.Services.Gear;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.Garage;


public class GetBikesByUserIdActionHandler : IGetBikesByUserIdActionHandler
{
    private readonly IStravaRequestService _stravaRequestService;
    private readonly IGetStravaTokenForUser _getStravaTokenForUser;
    private readonly IMapper _mapper;
    private readonly IGetAllBikesByUserId _getAllBikesByUserId;
    private readonly IUpsertBike _upsertBike;

    public GetBikesByUserIdActionHandler(IStravaRequestService stravaRequestService, IGetStravaTokenForUser getStravaTokenForUser, IMapper mapper, IGetAllBikesByUserId getAllBikesByUserId, IUpsertBike upsertBike)
    {
        _stravaRequestService = stravaRequestService;
        _getStravaTokenForUser = getStravaTokenForUser;
        _mapper = mapper;
        _getAllBikesByUserId = getAllBikesByUserId;
        _upsertBike = upsertBike;
    }

    public async Task<GetBikesByUserIdRequest.Response> ExecuteAsync(GetBikesByUserIdRequest request)
    {
        ValidateRequest(request);
        var token = await _getStravaTokenForUser.ExecuteAsync(new GetStravaTokenForUserContract(request.UserId));

        if (token != null)
        {
            try
            {
                _stravaRequestService.UserId = request.UserId;
                _stravaRequestService.RefreshToken = token.StravaToken.RefreshToken;
                var result = await _getAllBikesByUserId.ExecuteAsync(new GetAllBikesByUserIdContract(request.UserId));

                var stravaGear = new List<DetailedGearApiModel>();

                foreach (var bike in result.Bikes)
                {
                    if (!string.IsNullOrEmpty(bike.BikeId) && bike.ImportedFromStrava)
                    {
                        var stravaBikeResponse = await _stravaRequestService.GetGearById(new GetGearByIdContract(bike.BikeId));

                        if (stravaBikeResponse != null)
                        {
                            stravaGear.Add(stravaBikeResponse.DetailedGearApiModel);

                            bike.MetersLogged = stravaBikeResponse.DetailedGearApiModel.Distance;

                            await _upsertBike.ExecuteAsync(new UpsertBikeContract(bike));
                        }
                    }
                }
                return new GetBikesByUserIdRequest.Response(result.Bikes);
            }
            catch (Exception ex)
            {
                throw new Exception($"Unable to load bike. Error: {ex.Message}");
            }
        }
        return new GetBikesByUserIdRequest.Response(new List<BikeModel>());
    }

    private void ValidateRequest(GetBikesByUserIdRequest request)
    {
        if (request == null)
        {
            throw new ArgumentNullException(nameof(request));
        }
        if(string.IsNullOrEmpty(request.UserId))
        {
            throw new ArgumentNullException(nameof(request.UserId));
        }
    }
}
