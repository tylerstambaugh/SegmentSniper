import "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useGetCreateSubscription } from "../../../../hooks/Api/Admin/StravaWebhook/usePostCreateSubscription";



const ManageStravaWebhookWidget = () => {

    const { refetch: createSubscription,
        data: createSubscriptionData,
        isLoading: createSubscriptionIsLoading,
        isError: createSubscriptionIsError,
        error: createSubscriptionError } = useGetCreateSubscription();


    return (
        <Container className="d-flex justify-content-center pt-3">
            <Card>
                <Card.Body className="mx-3">
                    <Row>

                        <h2 className="fw-bold mb-2">Create Subscription</h2>
                        {createSubscriptionIsError &&
                            <div className="alert alert-danger" role="alert">
                                <strong>Error:</strong> {createSubscriptionError?.message ?? "An error occurred while creating the subscription."}
                            </div>}
                        {createSubscriptionIsLoading ?
                            <Button
                                variant="secondary"
                                className={"me-1"}
                                style={{ width: "75px" }}
                            >
                                <Spinner
                                    size="sm"
                                    variant="light"
                                    // as="span"
                                    // role="status"
                                    aria-hidden="true"
                                    animation="border"
                                />
                            </Button> :
                            <Button
                                onClick={() => {
                                    createSubscription();
                                    console.log("Create Subscription clicked");
                                }}
                                className={"me-1"}
                                style={{ width: "75px" }}
                            >Subscripe
                            </Button>
                        }
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body className="mx-3">
                    <Row>
                        <Col>
                            <h2 className="fw-bold mb-2">View Subscription</h2>
                            <Button >View</Button>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body className="mx-3">
                    <Row>
                        <Col>
                            <h2 className="fw-bold mb-2">Delete Subscription</h2>
                            <Button >Delete</Button>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )

}

export default ManageStravaWebhookWidget;