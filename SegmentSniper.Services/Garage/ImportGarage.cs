using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Models.Garage;

namespace SegmentSniper.Services.Garage
{
    public class ImportGarage : IImportGarage
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly IMapper _mapper;

        public ImportGarage(ISegmentSniperDbContext segmentSniperDbContext, IMapper mapper)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
            _mapper = mapper;
        }

        public async Task<ImportGarageContract.Result> ExecuteAsync(ImportGarageContract contract)
        {
            ValidateContract(contract);

            try
            {

            var existingBikes = await _segmentSniperDbContext.Bikes.Where(b => b.AuthUserId == contract.UserId).ToListAsync();

            //If we want to seed the bike activities with data 
            //var existingBikeActivies = _segmentSniperDbContext.BikeActivities.Where(b => b.UserId == contract.UserId);

            var existingBikeIds = existingBikes.Select(b => b.BikeId).ToList();

            var bikesToAdd = contract.Bikes.Where(b => !existingBikeIds.Contains(b.BikeId)).ToList();

            var mappedBikes = new List<Bike>();

            foreach (var bike in bikesToAdd)
            {
                var mappedBike = _mapper.Map<BikeModel, Bike>(bike);
                mappedBike.CreatedDate = DateTime.UtcNow;
                    mappedBike.ImportedFromStrava = true;
                mappedBike.AuthUserId = contract.UserId;
                mappedBikes.Add(mappedBike);
            }
                        
            _segmentSniperDbContext.Bikes.AddRange(mappedBikes);

            await _segmentSniperDbContext.SaveChangesAsync();

            var allBikes = existingBikes.Concat(mappedBikes).ToList();
            var returnListBikeModels = _mapper.Map<List<Bike>, List<BikeModel>>(allBikes);

            return new ImportGarageContract.Result(returnListBikeModels);
            }
            catch(Exception e)
            {
                throw new ApplicationException("Failed to import garage", e);
            }
        }

        private void ValidateContract(ImportGarageContract contract)
        {
            if (contract == null)
            {
                throw new ArgumentNullException(nameof(contract));
            }

            if (string.IsNullOrEmpty(contract.UserId))
            {
                throw new ArgumentNullException(nameof(contract.UserId));
            }
        }
    }
}
