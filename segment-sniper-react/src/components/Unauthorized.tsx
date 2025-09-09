import { Button, Col, Container, Row } from "react-bootstrap";




export default function Unauthorized() {
    return (
        <Container className="d-flex flex-column justify-content-center text-center mt-5">
            <Col>
                <Row>

                    <h1>Unauthorized</h1>
                </Row>
                <Row>

                    <p>You do not have permission to view this page.</p>
                </Row>
                <Row>
                    <Button
                        variant="primary"
                        href="/"> Home</Button>
                </Row>
            </Col>

        </Container>
    );
}