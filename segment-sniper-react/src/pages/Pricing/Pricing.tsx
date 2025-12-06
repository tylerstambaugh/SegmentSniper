import { PricingTable } from '@clerk/clerk-react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function PricingPage() {
  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="d-flex justify-content-center pt-3 ">
        <Col xl={6} lg={8} md={10} sm={12} xs={12}>
          <Card className="shadow">
            <Card.Body className="mx-3">
              <div className="mb-2 text-center">
                <h2 className="fw-bold mb-2 ">Pricing Plans</h2>
                <Row>
                  <Col className="d-flex p-2 mb-2 justify-content-center">
                    <PricingTable newSubscriptionRedirectUrl="/billing/success" />
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
