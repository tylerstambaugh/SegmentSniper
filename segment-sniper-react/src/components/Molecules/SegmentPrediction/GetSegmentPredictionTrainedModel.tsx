import { Button, Card, Col, Row } from "react-bootstrap"
import { useGetSegmentPredictionTrainedModelQuery } from "../../../hooks/Api/SegmentPrediction/useGetSegmentPredictionTrainedModelQuery"
import { SegmentPredictionTrainedModelResponse } from "../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData";

function SegmentPredictionTrainedModel () {

    const {data: SegmentPredictionTrainedModelResponse, isError, isLoading  }= useGetSegmentPredictionTrainedModelQuery();
    return (
       <Card>
        <Card.Title>Segment Prediction Model Data</Card.Title>
        <Card.Body>
            <Col>
            <Row>
                Model Created: {SegmentPredictionTrainedModelResponse?.createdDate.toISODate() ?? "None"}
               
            </Row>
            <Row>
                Model Updated: {SegmentPredictionTrainedModelResponse?.updatedDate.toISODate() ?? "None"}
            </Row>
            <Row>
                <Button
                    
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