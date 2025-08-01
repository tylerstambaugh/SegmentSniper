﻿using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using SegmentSniper.Models.Models.Strava.Token;
using SegmentSniper.Services.StravaTokenServices;
using StravaApiClient.Configuration;
using StravaApiClient.Services.Webhook;
using System.Net.Http.Headers;
using System.Text;

namespace StravaApiClient
{
    public class StravaRequestClient : IStravaRequestClient
    {
        private readonly IStravaRequestClientConfiguration _config;
        private readonly IMemoryCache _cache;
        private readonly IUpdateStravaTokenForUser _updateStravaToken;
        private string _accessToken { get; set; }
        private DateTime _tokenExpiration { get; set; }
        private int _tokenExpirationBufferSeconds = 120;

        private HttpMessageHandler _handler { get; set; }
        private HttpMessageHandler Handler
        {
            get => _handler ?? new HttpClientHandler();
            set => _handler = value;
        }

        public StravaRequestClient(IStravaRequestClientConfiguration config, IMemoryCache cache, IUpdateStravaTokenForUser updateStravaToken) : this(null, config, cache, updateStravaToken)
        {
        }

        internal StravaRequestClient(HttpMessageHandler handler, IStravaRequestClientConfiguration config, IMemoryCache cache, IUpdateStravaTokenForUser updateStravaToken)
        {
            _handler = handler;
            _config = config;
            _cache = cache;
            _updateStravaToken = updateStravaToken;
        }

        public async Task<TResponse> GetAsync<TResponse>(string url) where TResponse : class
        {
            _accessToken = await GetAccessToken();

            TResponse? result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                ConfigureHttpClient(httpClient);

                var response = await httpClient.GetAsync(url);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);

                if (result == null)
                {
                    throw new InvalidOperationException($"Failed to deserialize API response to {typeof(TResponse).Name}. Received: {stringResult}");
                }
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
            return await Post<TResponse>(url);
        }

        public async Task<HttpResponseMessage> PostAsync<TRequest>(string url, TRequest data)
        {
            var serializedData = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var result = await Post<HttpResponseMessage>(url, serializedData);
            return result;
        }

        private async Task<TResponse> Post<TResponse>(string url, StringContent? data = null) where TResponse : class
        {
            _accessToken = await GetAccessToken();

            TResponse? result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                ConfigureHttpClient(httpClient);

                var response = await httpClient.PostAsync(url, data);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();

                if (result == null)
                {
                    throw new InvalidOperationException($"Failed to deserialize API response to {typeof(TResponse).Name}. Received: {stringResult}");
                }
            }
            return result;
        }

        public async Task<TResponse> PutAsync<TRequest, TResponse>(string url, TRequest data) where TResponse : class
        {
            _accessToken = await GetAccessToken();

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

        public async Task<TResponse> DeleteAsync<TResponse>(string url) where TResponse : class
        {
            _accessToken = await GetAccessToken();

            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {

                ConfigureHttpClient(httpClient);

                var response = await httpClient.DeleteAsync(url);
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
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await httpClient.PostAsync(url, null);

                await VerifyResponse(response);

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }
            return result;
        }

        public async Task<TResponse> PostWebhookSubscription<TRequest, TResponse>(string url, TRequest data) where TResponse : class
        {
            var formData = new List<KeyValuePair<string, string>>();

            if (data is CreateStravaWebhookSubscriptionData subscriptionData)
            {
                formData.Add(new KeyValuePair<string, string>("client_id", subscriptionData.ClientId.ToString()));
                formData.Add(new KeyValuePair<string, string>("client_secret", subscriptionData.ClientSecret));
                formData.Add(new KeyValuePair<string, string>("callback_url", subscriptionData.CallbackUrl));
                formData.Add(new KeyValuePair<string, string>("verify_token", subscriptionData.VerifyToken));
            }
            else
            {
                throw new ArgumentException("Unsupported data type for webhook subscription.");
            }

            var formContent = new FormUrlEncodedContent(formData);

            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = await httpClient.PostAsync(url, formContent);

                await VerifyResponse(response); 

                var stringResult = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TResponse>(stringResult);
            }
            return result;
        }

        public async Task<TResponse> GetWebhookSubscription<TResponse>(string url) where TResponse : class
        {
            TResponse result = null;
            using (var httpClient = new HttpClient(Handler))
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var response = await httpClient.GetAsync(url);
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
                    var errorObject = JsonConvert.DeserializeObject<StravaApiError>(error);
                    throw new HttpRequestException($"{response.StatusCode}: Message: {errorObject.Message}, Resource: {errorObject.Errors[0].Resource}, Field: {errorObject.Errors[0].Field}, Code: {errorObject.Errors[0].Code}");
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

                try
                {
                    _updateStravaToken.Execute(new UpdateStravaTokenContract
                    {
                        StravaToken = new StravaTokenModel
                        {
                            RefreshToken = result.RefreshToken,
                            ExpiresAt = Int32.Parse(result.ExpiresAt),
                            ExpiresIn = result.ExpiresIn
                        }
                    });
                }
                catch (Exception) { }

                _cache.Set(_config.UserId, result.AccessToken, DateTimeOffset.Now.AddSeconds((result.ExpiresIn - _tokenExpirationBufferSeconds)));
            }
        }

        private async Task<string> GetAccessToken()
        {
            if (_cache.TryGetValue(_config.UserId, out string accessToken))
            {
                return accessToken;
            }
            else
            {
                await PostRefreshToken();
                return _cache.Get<string>(_config.UserId);
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


        private class StravaApiError
        {
            [JsonProperty("message")]
            public string Message { get; set; }
            public List<StravaApiErrorDetail> Errors { get; set; }
        }
        private class StravaApiErrorDetail
        {
            [JsonProperty("resource")]
            public string Resource { get; set; }
            [JsonProperty("Field")]
            public string Field { get; set; }
            [JsonProperty("code")]
            public string Code { get; set; }
        }
    }
}