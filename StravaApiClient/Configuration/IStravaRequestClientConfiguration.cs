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
        string BaseUrl { get; }
        string OauthBaseUrl { get; }

    }
}


//{
//    "StravaAPICodes": {
//        "ClientId": 

//private readonly IGetAppSettings _getAppSettings;

//public ZohoSignRequestServiceConfiguration(SevenCorners.Common.Configuration.IGetAppSettings getAppSettings)
//{
//    _getAppSettings = getAppSettings;
//}
//public string ClientId => _getAppSettings.GetAppSetting("ZohoSignClientId");

//public string ClientSecret => _getAppSettings.GetAppSetting("ZohoSignClientSecret");

//public string RefreshToken => _getAppSettings.GetAppSetting("ZohoSignRefreshToken");

//public string BaseUrl => _getAppSettings.GetAppSetting("ZohoSignBaseUrl");