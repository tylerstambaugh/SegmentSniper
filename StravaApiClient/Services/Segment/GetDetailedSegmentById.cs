﻿using StravaApiClient.Models.Segment;

namespace StravaApiClient.Services.Segment
{
    public class GetDetailedSegmentById : IGetDetailedSegmentById
    {
        private readonly IStravaRequestClient _stravaRequestClient;
        public GetDetailedSegmentById(IStravaRequestClient stravaRequestClient)
        {
            _stravaRequestClient = stravaRequestClient;
        }

        public async Task<GetDetailedSegmentByIdContract.Result> ExecuteAsync(GetDetailedSegmentByIdContract contract)
        {
            ValidateContract(contract);

            var apiResponse = await _stravaRequestClient.GetAsync<DetailedSegmentApiModel>($"segments/{contract.SegmentId}");
            return new GetDetailedSegmentByIdContract.Result(apiResponse);
        }

        private void ValidateContract(GetDetailedSegmentByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
            if(contract.SegmentId == null) throw new ArgumentException("Segment Id must be provided", nameof(contract.SegmentId));
        }
    }
}
