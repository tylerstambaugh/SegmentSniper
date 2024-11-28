import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import useTokenDataStore from "../../stores/useTokenStore";
import useUserStore from "../../stores/useUserStore";


export default function AutoLoggedOut() {
    const tokenData = useTokenDataStore((state) => state.tokenData);
    const user = useUserStore((state) => state.user);

    return (
        <>
            {tokenData === null && user === null ? (
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={6} lg={5} xs={10}>
                        <div className="border "></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 text-center">
                                    <h2>You have been logged out due to inactivity.</h2>

                                    <h3>
                                        <Link to={`/${AppRoutes.Login}`}>
                                            <Button className="px-4">Login</Button>
                                        </Link>{" "}
                                    </h3>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Container>
                    <Row>
                        <Col>Logging out...</Col>
                    </Row>
                </Container>
            )
            }
        </>
    )
}