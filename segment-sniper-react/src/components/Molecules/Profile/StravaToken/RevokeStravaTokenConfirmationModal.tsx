import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import useHandleDeleteStravaToken from "../../../../hooks/Api/User/Handlers/useHandleDeleteStravaToken";
import styles from "./RevokeStravaToken.module.scss";

export type RevokeStravaTokenConfirmationModalProps = {
  showRevokeStravaTokenConfirmModal: boolean;
  handleCloseModal: () => void;
};

const RevokeStravaTokenConfirmationModal = ({
  showRevokeStravaTokenConfirmModal,
  handleCloseModal,
}: RevokeStravaTokenConfirmationModalProps) => {
  const { handle: revokeStravaToken, isPending } = useHandleDeleteStravaToken();

  function handleConfirmClick() {
    revokeStravaToken().then(() => handleCloseModal);
  }

  return (
    <Modal show={showRevokeStravaTokenConfirmModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Token Revocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="px-2">
          <Row>
            <p>
              Are you sure you would like to revoke Segment Sniper Pro's access
              to your Strava account? You won't be able to use the app until you
              re-link your account.
            </p>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-end">
          <Col className="col-auto ml-auto">
            {isPending ? (
              <>
                <Button
                  variant="secondary"
                  className={`me-1 ${styles.editProfileFaButton} `}
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
              </>
            ) : (
              <Button variant="primary" onClick={() => handleConfirmClick()}>
                Confirm
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

export default RevokeStravaTokenConfirmationModal;
