using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace UpdateBikeEquipmentFunction
{
    public class Function1
    {
        [FunctionName("Function1")]
        public void Run([QueueTrigger("segmentsniperdevqueue", Connection = "UpdateBikeEquipmentFunctionQueueConnection")]string myQueueItem, ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");

            //this should run on an interval and tabulate the miles for each piece of equipment on each bike.
            // each piece of quipment should have the miles calculated as the sum of the miles for the bikeActivities since the install date of the equipment.
        }
    }
}
