using SegmentSniper.Data;
using SegmentSniper.Services.Interface;

namespace SegmentSniper.Services.Garage
{
    public class GetListOfRemindersToSend : IGetListOfRemindersToSend, IExecutableServiceAsync<GetListOfRemindersToSendContract, List<ReminderModel>>
    {
        private readonly ISegmentSniperDbContext _segmentSniperDbContext;

        public GetListOfRemindersToSend(ISegmentSniperDbContext segmentSniperDbContext)
        {
            _segmentSniperDbContext = segmentSniperDbContext;
        }

        public async Task <List<ReminderModel>> ExecuteAsync(GetListOfRemindersToSendContract contract)
        {
            return new List<ReminderModel>();
        }
    }
}
