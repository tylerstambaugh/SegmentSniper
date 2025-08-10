namespace SegmentSniper.Services.Garage
{
    public interface IGetListOfRemindersToSend
    {
        Task<List<ReminderModel>> ExecuteAsync(GetListOfRemindersToSendContract contract);
    }

    public class ReminderModel
    {
    }

    public class GetListOfRemindersToSendContract
    {
    }
}