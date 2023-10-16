using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        }

        private void ValidateContract(GetDetailedSegmentByIdContract contract)
        {
            if (contract == null) throw new ArgumentNullException(nameof(contract));
        }
    }
}
