import { Button, Card, Col, Row } from "react-bootstrap"
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery"
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { useEffect, useState } from "react";
import { SegmentPredictionTrainedModelData } from "../../../models/SegmentPrediction/SegmentPredictionTrainedModelData";
import { CustomToast } from "../Toast/CustomToast";

function SegmentPredictionTrainedModel () {

    const {data, isError, isLoading: getSegmentPredictionTrainedModelQueryloading, error: getSegmentPredictionTrainedModelQueryError  }= useGetSegmentPredictionTrainedModelQuery();
    const trainSegmentPredictionModel = useGetTrainSegmentPredictionModel();
    const [segmentPredictionTrainedModelData, setSegmentPredictionTrainedModelData] = useState<SegmentPredictionTrainedModelData | null>(data || null);

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


    if (getSegmentPredictionTrainedModelQueryloading) return <div>Loading...</div>;
   // if (isError) return <div>Error loading model data</div>;


    return (
        <>
        <Row className="d-flex justify-content-center pt-3 ">
          <Col md={6} xs={10}>
            <Card className="shadow">
        <Card.Title>Segment Prediction Model Data</Card.Title>
        <Card.Body>
            <Col>
            <Row>
                Model Created: {segmentPredictionTrainedModelData?.createdDate.toISODate() ?? "None"}
               
            </Row>
            <Row>
                Model Updated: {segmentPredictionTrainedModelData?.updatedDate.toISODate() ?? "None"}
            </Row>
            <Row>
                Number of Segments Used In Training Model: {segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ?? 0}
            </Row>
            <Row>
                <Button
                    onClick={() => handleTrainSegmentPredictionModelClick()}
                >
                    Retrain Model
                </Button>
            </Row>
            </Col>
        </Card.Body>
       </Card>
       </Col>
       </Row>
       </>
    )
    }
    
    export default SegmentPredictionTrainedModel