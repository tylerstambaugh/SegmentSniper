using log4net.Appender;
using log4net.Core;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Api.Logging
{

    public class EfCoreAppender : AppenderSkeleton
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public EfCoreAppender(IServiceProvider serviceProvider, ISegmentSniperDbContext segmentSniperDbContext)
        {
            _serviceProvider = serviceProvider;
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        protected override void Append(LoggingEvent loggingEvent)
        {
            var logEntry = new LogEntry
            {
                Message = loggingEvent.RenderedMessage,
                LogLevel = loggingEvent.Level.Name,
                Timestamp = loggingEvent.TimeStamp
            };
            _segmentSniperDbContext.LogEntries.Add(logEntry);
            _segmentSniperDbContext.SaveChanges();
        

            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<SegmentSniperDbContext>();
                    var logEntry2 = new LogEntry
                    {
                        Message = loggingEvent.RenderedMessage,
                        LogLevel = loggingEvent.Level.Name,
                        Timestamp = loggingEvent.TimeStamp
                    };
                    context.LogEntries.Add(logEntry2);
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

