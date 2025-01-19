using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Equiment;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetBikeById : IGetBikeById
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public GetBikeById(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<GetBikeByIdContract.Result> ExecuteAsync(GetBikeByIdContract contract)
        {

            ValidateContract(contract);

            var bike = _segmentSniperDbContext.Bikes
                      .Where(b => b.BikeId == contract.BikeId)
                      .Include(b => b.Equipment)
                      .FirstOrDefault();

            if (bike != null)
            {
                var bikeToReturn = _mapper.Map<BikeModel>(bike);

                return new GetBikeByIdContract.Result(bikeToReturn);
            }
            else
            {
                return new GetBikeByIdContract.Result(null);
            }
            

        }

        private void ValidateContract(GetBikeByIdContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (contract.BikeId == null)
            {
                throw new ArgumentNullException($"{nameof(contract.BikeId)} cannot be null");
            }
        }
    }
}
