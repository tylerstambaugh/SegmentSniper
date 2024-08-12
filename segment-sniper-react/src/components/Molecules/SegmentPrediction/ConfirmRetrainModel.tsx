
import { Modal, Col, Row, Button, Spinner } from "react-bootstrap";
import { useGetTrainSegmentPredictionModel } from "../../../hooks/Api/SegmentPrediction/useGetTrainSegmentPredictionModel";
import { useEffect } from "react";
import { CustomToast } from "../Toast/CustomToast";


export type ConfirmRetrainSegmentPredictionModelModalProps = {
    numberOfRecordsUsedInTraining: number,
    showConfirmRetrainModelModal: boolean,
    handleCloseModal: () => void
}

const ConfirmRretainSegmentPredictionModelModal = ({
    numberOfRecordsUsedInTraining, 
    showConfirmRetrainModelModal,
    handleCloseModal
}: ConfirmRetrainSegmentPredictionModelModalProps) => {


const {mutateAsync: retrainModel, isLoading, error: retrainModelError} = useGetTrainSegmentPredictionModel()

useEffect(() => {
    if(retrainModelError instanceof Error) {
        CustomToast({
            message: "Retrain Model Error",
            error: `Error: ${retrainModelError.message}`,
            type: "error"
        });
    }
}, [retrainModelError] )


function handleConfirm() {
    retrainModel();
}


return (
    <Modal show={showConfirmRetrainModelModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Retrain Segment Prediction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="px-2 py-2">
          <Row>
            <p>
              Are you sure you would like to retrain your segment prediction model? 
              All segment details gathered from the Segment Sniper will be used to retrain 
              the model. This cannot be undone and the segment prediction feature will be 
              unavailable while the model is training.
            </p>
            </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-end">
          <Col className="col-auto ml-auto">
            {isLoading ? (
              <>
                <Button variant="secondary" className={`me-1 `}>
                  <Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"
                  />
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => handleConfirm()}
               //className={`${styles.deleteAccountButton}`}
              >
                RETRAIN
              </Button>
            )}
          </Col>
          <Col className="col-auto">
            <Button
              variant="secondary"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmRretainSegmentPredictionModelModal