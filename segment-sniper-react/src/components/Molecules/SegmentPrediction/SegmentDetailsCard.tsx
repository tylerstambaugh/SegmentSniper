import { usePostStarSegment } from "../../../hooks/Api/Segments/usePostStarSegment";
import { SegmentDetails } from "../../../models/Segment/SegmentDetails"
import { CustomToast } from "../Toast/CustomToast";


type SegmentDetailsCardProps = {
    segmentDetails: SegmentDetails
}

const SegmentDetailsCard = ({
    segmentDetails,
} : SegmentDetailsCardProps) => {

    const starSegment = usePostStarSegment();

    async function handleStarButtonClick() {
        try {
          const response = await starSegment.mutateAsync({
            segmentId: segmentDetails.segmentId!,
            star: !segmentDetails.starred,
          });
    
          if (!starSegment.isError && !starSegment.isLoading && response !== null) {
            segmentDetails.starred = true 
          }
          
        } catch (error) {
          if (starSegment.error instanceof Error) {
            CustomToast({
              message: "Star failed",
              error: `Error: ${starSegment.error.message}`,
              type: "error",
            });
          } else {
            CustomToast({
              message: "Star failed",
              error: `Error: Unknown`,
              type: "error",
            });
          }
        }
      }
}