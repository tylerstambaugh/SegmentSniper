using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;

namespace SendEquipmentReminderFunction
{
    public class SendEquipmentReminderFunction
    {
        private readonly ILogger _logger;
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public SendEquipmentReminderFunction(ILoggerFactory loggerFactory, ISegmentSniperDbContext segmentSniperDbContext)
        {
            _logger = loggerFactory.CreateLogger<SendEquipmentReminderFunction>();
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        [Function(nameof(SendEquipmentReminderFunction))]
        public void Run([TimerTrigger("0 0 19 * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

            if (myTimer.ScheduleStatus is not null)
            {
                _logger.LogInformation($"Next timer schedule at: {myTimer.ScheduleStatus.Next}");
            }

            try
            {
                //need to query for all equipments that have exceeded the threshold for senging a reminder
                //and put them into a list

                //then need to iterate over the list and send a reminder for each
                //equipment that matches. 
            }
        }
    }
}
