using SegmentSniper.Data;
using SegmentSniper.Models.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class GetAllBikesByUserId : IGetAllBikesByUserId
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetAllBikesByUserId(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task<GetAllBikesByUserIdContract.Result> ExecuteAsync(GetAllBikesByUserIdContract contract)
        {

            ValidateContract(contract);

            var returnList = _segmentSniperDbContext.Bikes.Where(b => b.UserId == contract.UserId).Select(b => new BikeModel
            {
                BikeId = b.BikeId,
                Name = b.Name,
                IsPrimary = b.IsPrimary,
                Description = b.Description,
                BrandName = b.BrandName,
                ModelName = b.ModelName,
                MetersLogged = b.MetersLogged,
                FrameType = Enum.Parse<FrameType>(b.FrameType),
                UserId = b.UserId,
            }).ToList();

            return new GetAllBikesByUserIdContract.Result(returnList);
        }

        private void ValidateContract(GetAllBikesByUserIdContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (contract.UserId == null)
            {
                throw new ArgumentNullException($"{nameof(contract.UserId)} cannot be null");
            }
        }
    }
}
