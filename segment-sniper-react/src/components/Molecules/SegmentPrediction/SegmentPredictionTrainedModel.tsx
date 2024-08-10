import { Button, Card, Col, Row } from "react-bootstrap"
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery"
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { useEffect, useState } from "react";
import { SegmentPredictionTrainingDataUiModel } from "../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel";
import { CustomToast } from "../Toast/CustomToast";
import { DateTime } from 'luxon';
import ConfirmRretainSegmentPredictionModelModal from "./ConfirmRetrainModel";

function SegmentPredictionTrainedModel () {

    const {data, isError, isLoading: getSegmentPredictionTrainedModelQueryloading, error: getSegmentPredictionTrainedModelQueryError  }= useGetSegmentPredictionTrainedModelQuery();
    const trainSegmentPredictionModel = useGetTrainSegmentPredictionModel();
    const [segmentPredictionTrainedModelData, setSegmentPredictionTrainedModelData] = useState<SegmentPredictionTrainingDataUiModel | null>(data || null);
    const [showConfirmRetrainModelModal, setShowConfirmRetrainModelModal] = useState<boolean>(false);

   async function handleTrainSegmentPredictionModelClick() {
    const trainedModel = await trainSegmentPredictionModel.mutateAsync();
    setSegmentPredictionTrainedModelData(trainedModel);
    }

    useEffect(() => {
        // Update state when query data changes
        if (data) {
            setSegmentPredictionTrainedModelData(data);
        }
    }, [data]);
    
    useEffect(() => {
        if(getSegmentPredictionTrainedModelQueryError instanceof Error) {
            CustomToast({
                message: "Trained Model Query Error",
                error: `Error: ${getSegmentPredictionTrainedModelQueryError.message}`,
                type: "error"
            });
        }
    }, [getSegmentPredictionTrainedModelQueryError] )

    const formatDate = (date?: DateTime) => {
        if (!date) return "None";
        const dateString = DateTime.fromISO(date.toString());
        return dateString.toLocaleString(DateTime.DATETIME_MED);
      };

    if (getSegmentPredictionTrainedModelQueryloading) return <div>Loading...</div>;
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
       numberOfRecordsUsedInTraining={data?.numberOfSegmentsUsedInModelTraining ?? 0}
       showConfirmRetrainModelModal={showConfirmRetrainModelModal} 
       handleCloseModal={handleCloseModal}/>
       </>
    )
    }
    
    export default SegmentPredictionTrainedModel