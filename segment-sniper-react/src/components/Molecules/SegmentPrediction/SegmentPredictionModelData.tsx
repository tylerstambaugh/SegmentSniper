import { Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { SegmentPredictionTrainingDataUiModel } from '../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel';
import { DateTime } from 'luxon';
import ConfirmRretainSegmentPredictionModelModal from './ConfirmRetrainModel';
import { useGetTrainSegmentPredictionModel } from '../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel';
import { CustomToast } from '../Toast/CustomToast';

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

  const {
    mutateAsync: trainModel,
    isLoading: trainModelIsLoading,
    error: trainModelError,
  } = useGetTrainSegmentPredictionModel();

  useEffect(() => {
    if (trainModelError instanceof Error) {
      CustomToast({
        message: 'Error training model',
        error: `Error: ${trainModelError.message}`,
        type: 'error',
      });
    }
  }, [trainModelError]);

  const formatDate = (date?: DateTime) => {
    if (!date) return 'None';
    const dateString = DateTime.fromISO(date.toString());
    return dateString.toLocaleString(DateTime.DATETIME_MED);
  };
  function handleCloseModal() {
    setShowConfirmRetrainModelModal(false);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Row className="d-flex justify-content-center pt-3 ">
        <Col md={6} xs={10}>
          <Card className="shadow">
            <Card.Title className="text-center pt-2">
              Segment Prediction Model Data
            </Card.Title>
            <Card.Body>
              <Col>
                {segmentPredictionTrainedModelData?.hasTrainedSegmentPredictionModel ? (
                  <>
                    <Row>
                      <Col>
                        <span className="card-label">Model Created: </span>
                        {formatDate(
                          segmentPredictionTrainedModelData?.createdDate
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="card-label">Model Updated: </span>
                        {formatDate(
                          segmentPredictionTrainedModelData?.updatedDate
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="card-label">
                          Number of Segments Used In Training Model:{' '}
                        </span>
                        {segmentPredictionTrainedModelData?.numberOfSegmentsUsedInModelTraining ??
                          0}
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col>
                        <span className="card-label">No model found </span>
                        {formatDate(
                          segmentPredictionTrainedModelData?.createdDate
                        )}
                      </Col>
                    </Row>
                  </>
                )}
                <div className="d-flex justify-content-center mb-2 mt-2">
                  <Row>
                    <Col>
                      {segmentPredictionTrainedModelData?.hasTrainedSegmentPredictionModel ? (
                        <Button
                          onClick={() => setShowConfirmRetrainModelModal(true)}
                        >
                          Retrain Model
                        </Button>
                      ) : trainModelIsLoading ? (
                        <Button
                          type="submit"
                          variant="secondary"
                          style={{ width: '75px' }}
                        >
                          <Spinner
                            as="span"
                            variant="light"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"
                          />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => trainModel()}
                        >
                          Train Segment Prediction Model
                        </Button>
                      )}
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
