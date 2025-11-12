namespace SegmentSniper.Services
{
    public class QueueSettings
    {
            public string? ConnectionString { get; set; }
            public string QueueName { get; set; } = "process-bike-activity-queue";
            public string? QueueServiceUri { get; set; }  // For Managed Identity in prod
            public string? ClientId { get; set; }         // For UAMI
        
    }
}
