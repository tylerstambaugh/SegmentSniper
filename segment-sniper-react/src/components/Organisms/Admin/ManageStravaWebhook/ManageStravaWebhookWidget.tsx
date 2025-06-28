import "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useGetCreateSubscription } from "../../../../hooks/Api/Admin/StravaWebhook/useGetCreateSubscription";
import { useGetViewSubscription } from "../../../../hooks/Api/Admin/StravaWebhook/useGetViewSubscription";
import { useDeleteSubscription } from "../../../../hooks/Api/Admin/StravaWebhook/useDeleteSubscription";
import { useState } from "react";
import { DeleteSubscriptionModal } from "../../../Molecules/ManageStravaWebhook/DeleteSubscriptionModal";


const ManageStravaWebhookWidget = () => {

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const { refetch: createSubscription,
        data: createSubscriptionData,
        isLoading: createSubscriptionIsLoading,
        isError: createSubscriptionIsError,
        error: createSubscriptionError } = useGetCreateSubscription();

    const {
        refetch: viewSubscription,
        data: viewSubscriptionData,
        isLoading: viewSubscriptionIsLoading,
        isError: viewSubscriptionIsError,
        error: viewSubscriptionError } = useGetViewSubscription();


    const {
        mutate: deleteSubscription,
        isPending: deleteSubscriptionIsLoading,
        isError: deleteSubscriptionIsError,
        error: deleteSubscriptionError } = useDeleteSubscription();



    return (
        <Container className="py-4"> {/* Add vertical padding to the container */}
            {/* This Col is the main content area, centered horizontally and limited in width */}
            <Col className="mx-auto">

                <DeleteSubscriptionModal
                    showDeleteSubscriptionModal={showDeleteConfirmation}
                    deleteSubscriptionIsLoading={deleteSubscriptionIsLoading}
                    handleDeleteSubscription={() => {
                        deleteSubscription();
                        setShowDeleteConfirmation(false);
                    }}
                    handleCloseModal={() => setShowDeleteConfirmation(false)}
                />

                <Row>
                    <Col className="justify-content-center">
                        <h1 className="fw-bold mb-2">Manage Strava Webhook</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={3}>
                        <h3>Subscription ID:</h3>
                    </Col>
                    <Col className="justify-content-left">
                        {viewSubscriptionIsLoading ? (
                            <Spinner
                                size="sm"
                                variant="light"
                                as="span"
                                role="status"
                                aria-hidden="true"
                                animation="border"
                            />) : (<p>{viewSubscriptionData?.subscriptionId ? viewSubscriptionData.subscriptionId : "None"}</p>)}
                    </Col>
                </Row>
                <Col lg={4}>
                    <Card className="pb-3 mb-3">
                        <Card.Body className="mx-3 pb-2">
                            <Row className="d-flex justify-content-center">
                                <Col>
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
                                                as="span"
                                                role="status"
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
                                        >Create Subscription
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="pb-3 mb-3">
                        <Card.Body className="mx-3">
                            <Row className="d-flex justify-content-center">
                                <Col>
                                    <h2 className="fw-bold mb-2">View Subscription Details</h2>
                                    {viewSubscriptionIsError &&
                                        <div className="alert alert-danger" role="alert">
                                            <strong>Error:</strong> {viewSubscriptionError?.message ?? "An error occurred while creating the subscription."}
                                        </div>}
                                    {viewSubscriptionIsLoading ?
                                        <Button
                                            variant="secondary"
                                            className={"me-1"}
                                            style={{ width: "75px" }}
                                        >
                                            <Spinner
                                                size="sm"
                                                variant="light"
                                                as="span"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border"
                                            />
                                        </Button> :
                                        <Button
                                            onClick={() => {
                                                viewSubscription();
                                            }}
                                            className={"me-1"}
                                        >View Subscription
                                        </Button>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {viewSubscriptionData &&
                                        <ul className="list-group mt-3">
                                            <li className="list-group-item">
                                                <strong>Id:</strong> {viewSubscriptionData.subscriptionId}
                                            </li>
                                        </ul>
                                    }
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="pb-3 mb-3">
                        <Card.Body className="mx-3">
                            <Row className="d-flex justify-content-center">
                                <Col>
                                    <h2 className="fw-bold mb-2">Delete Subscription</h2>
                                    {deleteSubscriptionIsError &&
                                        <div className="alert alert-danger" role="alert">
                                            <strong>Error:</strong> {deleteSubscriptionError?.message ?? "An error occurred while creating the subscription."}
                                        </div>}
                                    {deleteSubscriptionIsLoading ?
                                        <Button
                                            variant="secondary"
                                            className={"me-1"}
                                            style={{ width: "75px" }}
                                        >
                                            <Spinner
                                                size="sm"
                                                variant="light"
                                                as="span"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border"
                                            />
                                        </Button> :
                                        <Button
                                            onClick={() => {
                                                setShowDeleteConfirmation(true);
                                            }}
                                            className={"me-1"}
                                        >Delete Subscription
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Col>
        </Container>
    )
}

export default ManageStravaWebhookWidget;