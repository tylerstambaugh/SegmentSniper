namespace SegmentSniper.Data.Entities
{
    public class BaseEntity
    {
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime DeletedDate { get; set; } = DateTime.MaxValue;
    }
}
