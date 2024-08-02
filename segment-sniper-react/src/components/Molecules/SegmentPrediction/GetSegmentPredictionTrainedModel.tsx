import { Button, Card, Col, Row } from "react-bootstrap"
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery"
import { SegmentPredictionTrainedModelResponse } from "../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData";
import { useGetTrainSegmentPredictionModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModelQuery";
import { useEffect, useState } from "react";
import { SegmentPredictionTrainedModelData } from "../../../models/SegmentPrediction/SegmentPredictionTrainedModelData";

function SegmentPredictionTrainedModel () {

    const {data, isError, isLoading, error  }= useGetSegmentPredictionTrainedModelQuery();
    const trainSegmentPredictionModel = useGetTrainSegmentPredictionModelQuery();
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

    if (isLoading) return <div>Loading...</div>;
   // if (isError) return <div>Error loading model data</div>;


    return (
       <Card>
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
    )
    }
    
    export default SegmentPredictionTrainedModel