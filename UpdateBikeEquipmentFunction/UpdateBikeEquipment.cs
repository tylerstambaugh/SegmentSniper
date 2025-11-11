using Azure.Storage.Queues.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SegmentSniper.Data;
using SegmentSniper.Services.Common;
using SegmentSniper.Services.Garage;
using System.Text;

namespace UpdateBikeEquipmentFunction
{
    public class UpdateBikeEquipment
    {
        private readonly ILogger<UpdateBikeEquipment> _logger;
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public UpdateBikeEquipment(ILogger<UpdateBikeEquipment> logger, ISegmentSniperDbContext segmentSniperDbContext)
        {
            _logger = logger;
            _segmentSniperDbContext = segmentSniperDbContext;
        }
        //fussed with storage account in Azure

        [Function(nameof(UpdateBikeEquipment))]
        public void Run([QueueTrigger("process-bike-activity-queue", Connection = "SegmentSniperDevQueueConnection")] QueueMessage message)
        {
            _logger.LogInformation($"C# Queue trigger function processed: {message.MessageText}");

            try
            {
                if (message.Body == null)
                {
                    _logger.LogError("Queue message body is null.");
                    return;
                }

                if (string.IsNullOrWhiteSpace(message.MessageText))
                {
                    _logger.LogError("Queue message text is null or empty.");
                    return;
                }

                // Decode Base64 → string
                var json = Encoding.UTF8.GetString(Convert.FromBase64String(message.MessageText));

                // Deserialize JSON → BikeActivityQueueMessage
                var queueItem = JsonConvert.DeserializeObject<BikeActivityQueueMessage>(json);

                if (queueItem == null)
                {
                    _logger.LogError("Failed to deserialize queue message to BikeActivityQueueMessage.");
                    return;
                }

                //_logger.LogInformation("Processing bike activity for AuthUserId: {AuthUserId}, BikeId: {BikeId}",
                //    queueItem?.AuthUserId, queueItem?.BikeId);
                             
                //need to query all equipment for the bike
                var bikeEquipment = _segmentSniperDbContext.Equipment
                    .Where(be => be.BikeId == queueItem.BikeId 
                                 && be.AuthUserId == queueItem.AuthUserId
                                 && be.RetiredDate < DateTime.MaxValue)
                    .ToList();

                foreach (var equipment in bikeEquipment)
                {
                    // For each piece of equipment, calculate total distance
                    var totalDistance = _segmentSniperDbContext.BikeActivities
                        .Where(ba => ba.BikeId == queueItem.BikeId
                                     && ba.AuthUserId == queueItem.AuthUserId
                                     && ba.ActivityDate >= equipment.InstallDate)
                        .Sum(ba => ba.DistanceInMeters);
                    // Update equipment total distance
                    equipment.TotalMilage =(decimal)CommonConversionHelpers.ConvertMetersToMiles(totalDistance);
                    equipment.UpdatedDate = DateTime.UtcNow;
                }

                _segmentSniperDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to parse or process queue message: {MessageText}", message.MessageText);
            }
        }
    }
}
