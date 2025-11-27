using Azure.Core;
using Azure.Identity;
using Azure.Storage.Queues;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
using Newtonsoft.Json;
using Serilog;

namespace SegmentSniper.Services.Garage
{
    public interface IBikeActivityQueuePublisher
    {
        Task PublishMessageAsync<T>(T messageBody);
    }

    public class BikeActivityQueueMessage
    {
        public string AuthUserId { get; set; }
        public string BikeId { get; set; }
    }

    public class BikeActivityQueuePublisher : IBikeActivityQueuePublisher
    {
        private readonly QueueClient _queueClient;

        public BikeActivityQueuePublisher(IOptions<QueueSettings> options)
        {
            var settings = options.Value;

            TokenCredential credential;

            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                // LOCAL DEVELOPMENT
                credential = new AzureCliCredential();
                // Or: new VisualStudioCredential();
                // Or: Connection string fallback
            }
            else
            {
                // PRODUCTION (managed identity)
                credential = new DefaultAzureCredential(new DefaultAzureCredentialOptions
                {
                    ManagedIdentityClientId = settings.ClientId
                });
            }

            if (!string.IsNullOrEmpty(settings.QueueServiceUri))
                {
                    // Production: Managed Identity       
                    _queueClient = new QueueClient(
                        new Uri($"{settings.QueueServiceUri}/{settings.QueueName}"),
                        credential
                    );

                    Log.Information("Publisher initialized with Managed Identity: QueueServiceUri={QueueServiceUri}, QueueName={QueueName}",
                        settings.QueueServiceUri, settings.QueueName);
                }
                else
                {
                    // Local dev: Connection string (Azurite)
                    _queueClient = new QueueClient(settings.ConnectionString!, settings.QueueName);

                    Log.Information("Publisher initialized with ConnectionString: QueueName={QueueName}", settings.QueueName);
                }           
        }

        public async Task PublishMessageAsync<T>(T message)
        {



            try
            {
                var messageJson = JsonConvert.SerializeObject(message);
                var messageBytes = System.Text.Encoding.UTF8.GetBytes(messageJson);
                var messageBase64 = Convert.ToBase64String(messageBytes);

                await _queueClient.SendMessageAsync(messageBase64);
            }
            catch (Exception ex)
            {
                Log.Error("Unable to send message to queue. Exception:{exception}", ex);
            }

        }
    }
}
