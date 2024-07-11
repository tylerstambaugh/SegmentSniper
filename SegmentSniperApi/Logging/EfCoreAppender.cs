using log4net.Appender;
using log4net.Core;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Api.Logging
{

    public class EfCoreAppender : AppenderSkeleton
    {
        private readonly IServiceProvider _serviceProvider;

        public EfCoreAppender(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override void Append(LoggingEvent loggingEvent)
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<SegmentSniperDbContext>();
                    var logEntry = new LogEntry
                    {
                        Message = loggingEvent.RenderedMessage,
                        LogLevel = loggingEvent.Level.Name,
                        Timestamp = loggingEvent.TimeStamp
                    };
                    context.LogEntries.Add(logEntry);
                    context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                // Handle any errors here
                Console.WriteLine("Failed to write log to database: " + ex.Message);
            }
        }

    }
}

