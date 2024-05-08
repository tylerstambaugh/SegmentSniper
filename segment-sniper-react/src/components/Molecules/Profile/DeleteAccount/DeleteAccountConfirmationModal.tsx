import { Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import useHandleDeleteStravaToken from "../../../../hooks/Api/Profile/Handlers/useHandleDeleteStravaToken";
import styles from "./RevokeStravaToken.module.scss";

export type DeleteAccountModalProps = {
  showDeleteAccountModal: boolean;
  handleCloseModal: () => void;
};

const RevokeStravaTokenConfirmationModal = ({
  showDeleteAccountModal,
  handleCloseModal,
}: DeleteAccountModalProps) => {
  const { handle: revokeStravaToken, isLoading } = useHandleDeleteStravaToken();

  function handleConfirmClick() {
    revokeStravaToken().then(() => handleCloseModal);
  }

  return (
    <Modal show={showDeleteAccountModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Token Revocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="px-2">
          <Row>
            <p>
              Are you sure you would like to delete you Segment Sniper Pro
              account? All your information will be deleted. This cannot be
              undone.
            </p>
          </Row>
          <Row>
            <p>
              To proceed, type your email address in the box and press DELETE.
            </p>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-end">
          <Col className="col-auto ml-auto">
            {isLoading ? (
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
              <Button variant="third" onClick={() => handleConfirmClick()}>
                DELETE
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
