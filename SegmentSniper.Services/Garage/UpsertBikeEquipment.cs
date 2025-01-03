using SegmentSniper.Data;

namespace SegmentSniper.Services.Garage
{
    public class UpsertBikeEquipment : IUpsertBikeEquipment
    {
        private readonly ISegmentSniperDbContext _context;

        public UpsertBikeEquipment(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        public async Task<UpsertBikeEquipmentContract.Result> ExecuteAsync(UpsertBikeEquipmentContract contract)
        {
            ValidateContract(contract);

            throw new NotImplementedException();
        }

        private void ValidateContract(UpsertBikeEquipmentContract contract)
        {
            throw new NotImplementedException();
        }
    }
}
