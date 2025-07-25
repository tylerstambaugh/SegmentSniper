﻿using Duende.IdentityServer.ResponseHandling;

namespace StravaApiClient
{
    public interface IStravaRequestClient
    {
        Task<TResponse> GetAsync<TResponse>(string url) where TResponse : class;
        Task<TResponse> PostAsync<TRequest, TResponse>(string url, TRequest data) where TResponse : class;
        Task<HttpResponseMessage> PostAsync<TRequest>(string url, TRequest data);
        Task<TResponse> PostAsync<TResponse>(string url) where TResponse : class;
        Task<TResponse> PostExchangeAuthCodeForToken<TResponse>(string url) where TResponse: class;
        Task<TResponse> PostWebhookSubscription<TRequest, TResponse>(string url, TRequest data) where TResponse : class;
        Task<TResponse> GetWebhookSubscription<TResponse>(string url) where TResponse : class;
        Task PostRefreshToken();
        Task<TResponse> PutAsync<TRequest, TResponse>(string url, TRequest data) where TResponse : class;
        Task<TResponse> DeleteAsync<TResponse>(string url) where TResponse : class;
    }
}