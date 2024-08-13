import { Button, Card, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { SegmentPredictionTrainingDataUiModel } from '../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel';
import { DateTime } from 'luxon';
import ConfirmRretainSegmentPredictionModelModal from './ConfirmRetrainModel';

export type SegmentPredictionModelDataProps = {
  trainSegmentPredictionModel: () => void;
  isLoading: boolean;
  segmentPredictionTrainedModelData: SegmentPredictionTrainingDataUiModel | null;
};

const SegmentPredictionModelData: React.FC<SegmentPredictionModelDataProps> = ({
  trainSegmentPredictionModel,
  isLoading,
  segmentPredictionTrainedModelData,
}) => {
  const [showConfirmRetrainModelModal, setShowConfirmRetrainModelModal] =
    useState<boolean>(false);

  const formatDate = (date?: DateTime) => {
    if (!date) return 'None';
    const dateString = DateTime.fromISO(date.toString());
    return dateString.toLocaleString(DateTime.DATETIME_MED);
  };
  function handleCloseModal() {
    setShowConfirmRetrainModelModal(false);
  }

  if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading model data</div>;

  return (
    <>
      <Row className="d-flex justify-content-center pt-3 ">
        <Col md={6} xs={10}>
          <Card className="shadow">
            <Card.Title className='text-center'>Segment Prediction Model Data</Card.Title>
            <Card.Body>
              <Col>
                <Row>
                  Model Created:{' '}
                  {formatDate(segmentPredictionTrainedModelData?.createdDate)}
                </Row>
                <Row>
                  Model Updated:{' '}
                  {formatDate(segmentPredictionTrainedModelData?.updatedDate)}
                </Row>

                <Row>
                  Number of Segments Used In Training Model:{' '}
                  {segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ??
                    0}
                </Row>
                <div className="d-flex justify-content-center mb-2">
                  <Row>
                    <Col>
                      <Button
                        onClick={() => setShowConfirmRetrainModelModal(true)}
                      >
                        Retrain Model
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmRretainSegmentPredictionModelModal
        numberOfRecordsUsedInTraining={
          segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ??
          0
        }
        showConfirmRetrainModelModal={showConfirmRetrainModelModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default SegmentPredictionModelData;
