import { Row, Modal, Col, Button, Form, Spinner } from "react-bootstrap";


export type DeleteSubscriptionModalProps = {
    showDeleteSubscriptionModal: boolean;
    deleteSubscriptionIsLoading: boolean;
    handleDeleteSubscription: () => void;
    handleCloseModal: () => void;
}

export const DeleteSubscriptionModal = ({
    showDeleteSubscriptionModal,
    handleDeleteSubscription,
    deleteSubscriptionIsLoading,
    handleCloseModal
}: DeleteSubscriptionModalProps) => {

    return (
        <Modal show={showDeleteSubscriptionModal} >
            <Modal.Header closeButton>
                <Modal.Title>Delete Webhook Subscription?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col className="px-2 py-2">
                    <Row>
                        <p>
                            Are you sure you want to delete your Strava webhook subscription? This action cannot be undone.
                        </p>
                    </Row>
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Row className="justify-content-end">
                    <Col className="col-auto ml-auto">
                        {deleteSubscriptionIsLoading ? (
                            <>
                                <Button
                                    variant="secondary"
                                    className={`me-1`}
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
                            <Button variant="primary" onClick={() => handleDeleteSubscription()}>
                                Submit
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
    )

}
