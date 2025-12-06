import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function Unauthorized() {
  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="d-flex justify-content-center pt-3 ">
        <Col xl={6} lg={8} md={10} sm={12} xs={12}>
          <Card className="shadow">
            <Card.Body className="mx-3">
              <div className="mb-2 text-center">
                <h1>Unauthorized</h1>
                <p>Perhaps you need to log in first?</p>
                <Row>
                  <Col className="d-flex p-2 mb-2 justify-content-center">
                    <Button variant="primary" href="/">
                      {' '}
                      Home
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
