using AutoMapper;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Services.Garage;
using StravaApiClient;
using StravaApiClient.Models.Misc;
using StravaApiClient.Services.Gear;

namespace SegmentSniper.ApplicationLogic.ActionHandlers.GarageActionHandlers
{

    public class GetBikesByUserIdActionHandler : IGetBikesByUserIdActionHandler
    {
        private readonly IStravaRequestService _stravaRequestService;
        private readonly IMapper _mapper;
        private readonly IGetAllBikesByUserId _getAllBikesByUserId;
        private readonly IUpsertBike _upsertBike;

        public GetBikesByUserIdActionHandler(IStravaRequestService stravaRequestService, IMapper mapper, IGetAllBikesByUserId getAllBikesByUserId, IUpsertBike upsertBike)
        {
            _stravaRequestService = stravaRequestService;
            _mapper = mapper;
            _getAllBikesByUserId = getAllBikesByUserId;
            _upsertBike = upsertBike;
        }

        public async Task<GetBikesByUserIdRequest.Response> ExecuteAsync(GetBikesByUserIdRequest request)
        {
            ValidateRequest(request);

            var result = await _getAllBikesByUserId.ExecuteAsync(new GetAllBikesByUserIdContract(request.UserId));

            var stravaGear = new List<DetailedGearApiModel>();

            foreach(var bike in result.Bikes)
            {
               var stravaBikeResponse = await _stravaRequestService.GetGearById(new GetGearByIdContract(bike.BikeId));

                if (stravaBikeResponse != null)
                {
                    stravaGear.Add(stravaBikeResponse.DetailedGearApiModel);
                    
                    bike.MetersLogged = stravaBikeResponse.DetailedGearApiModel.Distance;

                    await _upsertBike.ExecuteAsync(new AddBikeContract(bike));
                }

            }

            return new GetBikesByUserIdRequest.Response(result.Bikes);
        }

        private void ValidateRequest(object request)
        {
            throw new NotImplementedException();
        }
    }
}
