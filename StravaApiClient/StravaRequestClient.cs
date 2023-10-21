using Newtonsoft.Json;
using StravaApiClient.Configuration;
using System.Net.Http.Headers;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace StravaApiClient
{
    public class StravaRequestClient : IStravaRequestClient
    {
        private readonly IStravaRequestClientConfiguration _config;
       

        private string _accessToken { get; set; }
        private DateTime _tokenExpiration { get; set; }
        private int _tokenExpirationBufferMinutes = 10;

        private HttpMessageHandler _handler { get; set; }
        private HttpMessageHandler Handler
        {
            get => _handler ?? new HttpClientHandler();
            set => _handler = value;
        }

        public StravaRequestClient(IStravaRequestClientConfiguration config) : this(null, config)
        {
        }

        internal StravaRequestClient(HttpMessageHandler handler, IStravaRequestClientConfiguration config)
        {
            _handler = handler;
            _config = config;
        }

        public async Task<TResponse> GetAsync<TResponse>(string url) where TResponse : class
        {
            if (!TokenIsValid())
            {
                await PostRefreshToken();
            }

            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                ConfigureHttpClient(httpClient);

                var response = await httpClient.GetAsync(url);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }

            return result;
        }

        public async Task<TResponse> PostAsync<TRequest, TResponse>(string url, TRequest data) where TResponse : class
        {
            var serializedData = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            return await Post<TResponse>(url, serializedData);
        }

        public async Task<TResponse> PostAsync<TResponse>(string url) where TResponse : class
        {
            return await Post<TResponse>(url, null);
        }

        private async Task<TResponse> Post<TResponse>(string url, StringContent data) where TResponse : class
        {
            if (!TokenIsValid())
            {
                await PostRefreshToken();
            }

            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                ConfigureHttpClient(httpClient);

                var response = await httpClient.PostAsync(url, data);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }
            return result;
        }

        public async Task<TResponse> PutAsync<TRequest, TResponse>(string url, TRequest data) where TResponse : class
        {
            if (!TokenIsValid())
            {
                await PostRefreshToken();
            }

            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {

                ConfigureHttpClient(httpClient);

                if (!(data is HttpContent content))
                {
                    var jsonRequest = JsonConvert.SerializeObject(data);
                    content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
                }

                var response = await httpClient.PutAsync(url, content);
                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }
            return result;
        }

        public async Task<TResponse> PostExchangeAuthCodeForToken<TResponse>(string url) where TResponse : class
        {
            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                //ConfigureHttpClient(httpClient);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await httpClient.PostAsync(url, null);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }
            return result;
        }

        private void ConfigureHttpClient(HttpClient httpClient)
        {
            httpClient.BaseAddress = new Uri(_config.BaseUrl);
            httpClient.DefaultRequestHeaders.Accept.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        }

        private static async Task VerifyResponse(HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();

                if (error.Contains("message"))
                {
                    var errorObject = JsonConvert.DeserializeAnonymousType(error, new { message = "" });
                    throw new HttpRequestException($"{response.StatusCode}: {errorObject.message}");
                }
                else if (!string.IsNullOrWhiteSpace(error))
                {
                    throw new HttpRequestException($"{response.StatusCode}: {error}");
                }
                else
                {
                    response.EnsureSuccessStatusCode();
                }
            }
        }

        private bool TokenIsValid()
        {
            return _accessToken != null
                && DateTime.Now.Subtract(TimeSpan.FromMinutes(_tokenExpirationBufferMinutes)) < _tokenExpiration;
        }

        public async Task PostRefreshToken()
        {
            using (var httpClient = new HttpClient(Handler))
            {
                httpClient.BaseAddress = new Uri(_config.OauthBaseUrl);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                var query = $"client_id={_config.ClientId}&client_secret={_config.ClientSecret}&refresh_token={_config.RefreshToken}&grant_type=refresh_token";

                var response = await httpClient.PostAsync($"token?{query}", null);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<RefreshTokenResponse>(stringResult);

                _accessToken = result.AccessToken;
                _tokenExpiration = DateTime.Now.AddSeconds(result.ExpiresIn);
            }
        }

        private class RefreshTokenResponse
        {
            [JsonProperty("token_type")]
            public string TokenType { get; set; }
            [JsonProperty("access_token")]
            public string AccessToken { get; set; }
            [JsonProperty("expires_at")]
            public string ExpiresAt { get; set; }
            [JsonProperty("expires_in")]
            public int ExpiresIn { get; set; }
            [JsonProperty("refresh_token")]
            public string RefreshToken { get; set; }
        }
    }
}


//https://localhost:44411/api/ConnectWithStrava/ExchangeToken/id=09729500-2fcd-4e09-b5e1-5f6f210dad90?state=""&code=ac351fe304418bd91e5df797a3390483094ebfb9&scope=read,activity:write,activity:read_all,profile:write,profile:read_all

