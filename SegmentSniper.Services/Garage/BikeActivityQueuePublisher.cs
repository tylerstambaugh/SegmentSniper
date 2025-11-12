using Azure.Storage.Queues;
using Azure.Identity;
using Microsoft.Extensions.Options;
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

            if (!string.IsNullOrEmpty(settings.QueueServiceUri))
            {
                // Production: Managed Identity
                var credential = new DefaultAzureCredential(new DefaultAzureCredentialOptions
                {
                    ManagedIdentityClientId = settings.ClientId
                });

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
            var messageJson = JsonConvert.SerializeObject(message);
            var messageBytes = System.Text.Encoding.UTF8.GetBytes(messageJson);
            var messageBase64 = Convert.ToBase64String(messageBytes);

            await _queueClient.SendMessageAsync(messageBase64);
        }
    }
}
