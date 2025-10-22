using Azure.Storage.Queues;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

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
            _queueClient = new QueueClient(settings.ConnectionString, settings.QueueName);
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
