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
            <Modal.Header closeButton onHide={() => handleCloseModal()}>
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
            <Modal.Footer className="justify-content-center gap-5" >
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
                    <Button variant="third" onClick={() => handleDeleteSubscription()}>
                        Delete
                    </Button>
                )}
                <Button
                    variant="secondary"
                    onClick={() => {
                        handleCloseModal();
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )

}
