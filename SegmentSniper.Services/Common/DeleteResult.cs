namespace SegmentSniper.Services.Common
{
    public class DeleteResult
    {

        public DeleteResult(bool success)
        {
            Success = success;
        }
        /// <summary>
        /// Indicates if the deletion was successful.
        /// </summary>
        public bool Success { get; set; }
    }
}
