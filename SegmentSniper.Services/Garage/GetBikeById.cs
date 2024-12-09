using Microsoft.Extensions.Diagnostics.HealthChecks;
using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetBikeById : IGetBikeById
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetBikeById(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetBikeByIdContract.Result> ExecuteAsync(GetBikeByIdContract contract)
        {

            ValidateContract(contract);

            var bike = await _segmentSniperDbContext.Bikes.FindAsync(contract.BikeId);

            if (bike != null)
            {
                var returnModel = new BikeModel
                {
                    BikeId = bike.BikeId,
                    Name = bike.Name,
                    IsPrimary = bike.IsPrimary,
                    Description = bike.Description,
                    BrandName = bike.BrandName,
                    ModelName = bike.ModelName,
                    MetersLogged = bike.MetersLogged,
                    FrameType = Enum.Parse<FrameType>(bike.FrameType),
                    UserId = bike.UserId,
                };

                return new GetBikeByIdContract.Result(returnModel);
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
