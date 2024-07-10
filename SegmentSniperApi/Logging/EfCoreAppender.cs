using log4net.Appender;
using log4net.Core;
using SegmentSniper.Data;
using SegmentSniper.Data.Entities;

namespace SegmentSniper.Api.Logging
{


    public class EfCoreAppender : AppenderSkeleton
    {
        private readonly ISegmentSniperDbContext _context;

        public EfCoreAppender(ISegmentSniperDbContext context)
        {
            _context = context;
        }

        protected override void Append(LoggingEvent loggingEvent)
        {
            var logEntry = new LogEntry
            {
                Timestamp = loggingEvent.TimeStamp,
                LogLevel = loggingEvent.Level.Name,
                Message = loggingEvent.RenderedMessage,
                Exception = loggingEvent.GetExceptionString()
            };

            _context.LogEntries.Add(logEntry);
            _context.SaveChanges();
        }
    }

}
