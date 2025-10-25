using System;
using Azure.Storage.Queues.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace UpdateBikeEquipmentFunction
{
    public class UpdateBikeEquipment
    {
        private readonly ILogger<UpdateBikeEquipment> _logger;

        public UpdateBikeEquipment(ILogger<UpdateBikeEquipment> logger)
        {
            _logger = logger;
        }

        [Function(nameof(UpdateBikeEquipment))]
        public void Run([QueueTrigger("process-bike-activity-queue", Connection = "DefaultEndpointsProtocol=https;AccountName=segmentsniperdevqueue;AccountKey=dj8bvIp:cQSSaQOMtBFV15FJNEyEGgKaZJ7edhZ39xN97M7gEDiyTqmF7KdgsWelwMGRjkivm1q8+AStz1bSuA==;EndpointSuffix=core.windows.net")] QueueMessage message)
        {
            _logger.LogInformation($"C# Queue trigger function processed: {message.MessageText}");
        }
    }
}
