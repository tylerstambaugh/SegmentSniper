using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities.Garage;
using SegmentSniper.Services.Common;

namespace SendEquipmentReminderFunction
{
    public class SendEquipmentReminderFunction
    {
        private readonly ILogger _logger;
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;
        private readonly ISendEmail _sendEmailService;

        public SendEquipmentReminderFunction(ILoggerFactory loggerFactory, ISegmentSniperDbContext segmentSniperDbContext, ISendEmail sendEmailService)
        {
            _logger = loggerFactory.CreateLogger<SendEquipmentReminderFunction>();
            _segmentSniperDbContext = segmentSniperDbContext;
            _sendEmailService = sendEmailService;
        }

        [Function(nameof(SendEquipmentReminderFunction))]
        public async Task Run([TimerTrigger("0 */30 * * * *")] TimerInfo myTimer)
        //public async Task Run([TimerTrigger("0 0 */19 * * *")] TimerInfo myTimer)      
        {
            _logger.LogInformation($"Send equipment reminder function ran at: {DateTime.Now}");

            try
            {
                var today = DateTime.UtcNow.Date;

                var equipments =
                    await _segmentSniperDbContext.Equipment
                        .Where(eq =>
                            eq.MaxRemindersToSend < eq.RemindersSent && (

                                //reminded date has passed
                                (eq.ReminderDate <= today)

                                ||

                                //reminder based on install date + duration
                                (eq.InstallDate.HasValue &&
                                 eq.ReminderDurationInMonths > 0 &&
                                 EF.Functions.DateDiffDay(eq.InstallDate.Value, today)
                                     >= eq.ReminderDurationInMonths * 30)

                                ||

                                //reminder based on exeeding mileage threshold
                                (eq.RemindAtMiles >= eq.TotalMilage)
                            )
                        )
                        .Include(eq => eq.AppUser)
                        .Distinct()
                        .ToListAsync();


                foreach (var equipment in equipments)
                {
                   
                    //TODO : clean this up after testing
                   _logger.LogInformation("Sending reminder for EquipmentId: {EquipmentId}, Name: {Name}",

                   equipment.EquipmentId, equipment.Name);

                   await buildAndSendEmailAsync(equipment);
                    // Increment the RemindersSent count
                    equipment.RemindersSent += 1;
                    equipment.UpdatedDate = DateTime.UtcNow;
                }

                // Save changes to the database
                await _segmentSniperDbContext.SaveChangesAsync();


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send equipment reminder emails: {Message}", ex.Message);
            }
        }

        private async Task buildAndSendEmailAsync(Equipment equipment)
        {
            //TODO : set this based on environmentcd Se c
            var segmentSniperUrl = "https://segmentsniper.com";

            var subject = $"Segment Sniper Equipment Replacement Reminder - {equipment.Name}";
            var body = $@"
                            <p>Hey boss,</p>
                            <p>This is a reminder that your equipment <strong>{equipment.Name}</strong> 
                            is due for replacement or maintenance.</p>
                            <p>This is reminder number {equipment.RemindersSent + 1} of {equipment.MaxRemindersToSend} reminders that you will receive.</p>
                            <p>Please log in to your <a href=""{segmentSniperUrl}"">Segment Sniper</a> account and head to your garage</p>
                            <p>to view more details and update or retire your equipment.</p>
                            <p>Best regards,<br/>Segment Sniper Team</p>";

            var emailContract = new SendEmailContract
            {
                EmailAddress = equipment.AppUser?.EmailAddress,
                EmailSubject = subject,
                EmailBody = body
            };

            var result = await _sendEmailService.ExecuteAsync(emailContract);

            //TODO : clean this up after testing
            if (result.Success)
            {
                _logger.LogInformation("Reminder email sent successfully to {EmailAddress} for EquipmentId: {EquipmentId}",
                     equipment.AppUser?.EmailAddress, equipment.EquipmentId);
            }
            else
            {
                _logger.LogError("Failed to send reminder email to {EmailAddress} for EquipmentId: {EquipmentId}",
                     equipment.AppUser?.EmailAddress, equipment.EquipmentId);

            }
        }
    }
}
