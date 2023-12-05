using Microsoft.Identity.Client;
using StravaApiClient.Models.Segment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StravaApiClient.Services.Segment
{
    public class StarSegment : IStarSegment
    {
        private readonly IStravaRequestClient _client;

        public StarSegment(IStravaRequestClient client)
        {
            _client = client;
        }

        public async Task<StarSegmentContract.Result> ExecuteAsync(StarSegmentContract contract)
        {
            ValidateContract(contract);

            StarSegmentData request = new StarSegmentData(contract.Star);


            var apiResponse = await _client.PutAsync<StarSegmentData, DetailedSegmentApiModel>($"segments/{contract.SegmentId}/starred", request);

            return new StarSegmentContract.Result
            {
                StarredSegment = apiResponse
            };
        }

        private void ValidateContract(StarSegmentContract contract)
        {
           if(contract == null) throw new ArgumentNullException(nameof(contract));

           if(contract.Star == null) throw new ArgumentNullException(nameof(contract.Star));
        }
    }
}
