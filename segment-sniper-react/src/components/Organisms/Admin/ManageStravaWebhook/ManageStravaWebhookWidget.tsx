import { Button, Card, Col, Container, Row } from "react-bootstrap";






const ManageStravaWebhookWidget = () => {

    return (
        <Container className="d-flex justify-content-center pt-3">
            <Card>
                <Card.Body className="mx-3">
                    <Row>

                        <h2 className="fw-bold mb-2">Create Subscription</h2>
                        <Button >Create</Button>

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