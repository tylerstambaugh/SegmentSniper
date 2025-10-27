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
        public void Run([QueueTrigger("process-bike-activity-queue", Connection = "SegmentSniperDevQueueConnection")] QueueMessage message)
        {
            _logger.LogInformation($"C# Queue trigger function processed: {message.MessageText}");
        }
    }
}
