//using System;
//using System.Threading.Tasks;
//using System.Web.Http;
//using System.Web.Http.ModelBinding;
//using Microsoft.AspNetCore.Mvc.ModelBinding;
//using SevenCorners.EventLogging.Fluent;

//namespace SevenCorners.Common.Web.HttpActionHandlers;

//public interface IAsyncActionHandler<in TRequest, TResponse> where TRequest : class where TResponse : class
//{
//    Task<IHttpActionResult> HandleAsync(TRequest request);

//    IAsyncActionHandler<TRequest, TResponse> ConfigureRoutes(Func<IRouterBuilder<TResponse>, IRouterBuilder<TResponse>> routerBuilder);

//    IAsyncActionHandler<TRequest, TResponse> ConfigureValidation(ModelStateDictionary modelState, Func<ModelStateDictionary, IHttpActionResult> onInvalidModelState);

//    IAsyncActionHandler<TRequest, TResponse> ConfigureEventLogger(Func<IEventLoggerDataBuilder, IEventLoggerDataBuilder> eventLoggerDataBuilder);