import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";

export default function UserManagement() {
    return (
        <Container>
            <Row className="d-flex justify-content-center pt-3 ">
                <Col >
                    <Card className="shadow">
                        <Card.Body className="mx-3">
                            <div className="mb-2 text-center">
                                <h2 className="fw-bold mb-2 ">User Management</h2>
                                <Row >
                                    <Col
                                        className="d-flex p-2 mb-2 justify-content-center"
                                    >
                                        <Link
                                            to={`/${AppRoutes.UserManagement}`}
                                            className="primary-rounded-button text-decoration-none
                      "
                                            style={{ width: '155px' }}
                                        >
                                            View / Assign Roles
                                        </Link>
                                    </Col>
                                </Row>
                                //should have another row here for managing user strava info.
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}
