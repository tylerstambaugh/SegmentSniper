namespace SegmentSniper.Models.Strava.Webhook
{
    public class ViewSubscriptionResponseModel
    {
        public int Id { get; set; }

        public string CallbackUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int ResourceState { get; set; }
        public int ApplicationId { get; set; }
        public ViewSubscriptionResponseModel()
        {
        }     

    }
}
