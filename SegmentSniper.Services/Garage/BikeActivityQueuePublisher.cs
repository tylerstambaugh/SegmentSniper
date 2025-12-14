using Azure.Identity;
using Azure.Storage.Queues;
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
                    // production settings, point to azure storage queue using managed id
                    _queueClient = new QueueClient(
                        new Uri($"{settings.QueueServiceUri}/{settings.QueueName}"),
                        new DefaultAzureCredential(new DefaultAzureCredentialOptions
                        {
                            ManagedIdentityClientId = settings.ClientId
                        })
                    );
                }
                else
                {
                    // Local dev: Connection string (Azurite)
                    _queueClient = new QueueClient(settings.ConnectionString!, settings.QueueName);
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
