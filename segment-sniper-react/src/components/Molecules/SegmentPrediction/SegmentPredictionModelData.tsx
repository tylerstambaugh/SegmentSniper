import { Button, Card, Col, Row } from "react-bootstrap"
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery"
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { useEffect, useState } from "react";
import { SegmentPredictionTrainingDataUiModel } from "../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel";
import { CustomToast } from "../Toast/CustomToast";
import { DateTime } from 'luxon';
import ConfirmRretainSegmentPredictionModelModal from "./ConfirmRetrainModel";

export type SegmentPredictionModelDataProps = {
    trainSegmentPredictionModel: () => void,
    isLoading: boolean,
    error: Error | null,
    segmentPredictionTrainedModelData: SegmentPredictionTrainingDataUiModel | null,
}

const SegmentPredictionModelData: React.FC<SegmentPredictionModelDataProps> = ({
    trainSegmentPredictionModel,
    isLoading,
    error,
    segmentPredictionTrainedModelData,
}) => {

   
    const [showConfirmRetrainModelModal, setShowConfirmRetrainModelModal] = useState<boolean>(false);

    
    useEffect(() => {
        if(error instanceof Error) {
            CustomToast({
                message: "Trained Model Query Error",
                error: `Error: ${error.message}`,
                type: "error"
            });
        }
    }, [error] )

    const formatDate = (date?: DateTime) => {
        if (!date) return "None";
        const dateString = DateTime.fromISO(date.toString());
        return dateString.toLocaleString(DateTime.DATETIME_MED);
      };

    if (isLoading) return <div>Loading...</div>;
   // if (isError) return <div>Error loading model data</div>;

   function handleCloseModal()  {
    setShowConfirmRetrainModelModal(false)
   }

    return (
        <>
        <Row className="d-flex justify-content-center pt-3 ">
          <Col md={6} xs={10}>
            <Card className="shadow">
        <Card.Title>Segment Prediction Model Data</Card.Title>
        <Card.Body>
            <Col>
            <Row>
                  Model Created: {formatDate(segmentPredictionTrainedModelData?.createdDate)}
                </Row>
                <Row>
                  Model Updated: {formatDate(segmentPredictionTrainedModelData?.updatedDate)}
                </Row>

            <Row>
                Number of Segments Used In Training Model: {segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ?? 0}
            </Row>
            <Row>
                <Button
                    onClick={() => setShowConfirmRetrainModelModal(true)}
                >
                    Retrain Model
                </Button>
            </Row>
            </Col>
        </Card.Body>
       </Card>

       </Col>
       </Row>

       <ConfirmRretainSegmentPredictionModelModal 
       numberOfRecordsUsedInTraining={segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ?? 0}
       showConfirmRetrainModelModal={showConfirmRetrainModelModal} 
       handleCloseModal={handleCloseModal}/>
       </>
    )
    }
    
    export default SegmentPredictionModelData