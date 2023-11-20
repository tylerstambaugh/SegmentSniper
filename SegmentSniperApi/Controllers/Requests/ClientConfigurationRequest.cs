using Microsoft.Identity.Client;

namespace SegmentSniper.Api.Controllers.Requests
{
    public class ClientConfigurationRequest
    {
        public ClientConfigurationRequest()
        {
            
        }

        public class Response
        {
            public Response(string stravaApiClientId, string googleMapsApiKey)
            {
                StravaApiClientId = stravaApiClientId;
                GoogleMapsApiKey = googleMapsApiKey;
            }

            public string StravaApiClientId { get; set; }
            public string GoogleMapsApiKey { get; set; }
         
        }
    }
}
