using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StravaApiClient.Configuration
{
    public interface IStravaRequestClientConfiguration
    {
        string ClientId { get; }
        string ClientSecret { get; }   
        string RefreshToken { get; set;  }
        string BaseUrl { get; }
        string OauthBaseUrl { get; }

    }
}

