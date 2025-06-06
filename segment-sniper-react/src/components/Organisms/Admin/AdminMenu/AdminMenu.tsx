import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";

export default function AdminWidget() {
  return (
    <Container>
      <Row className="d-flex justify-content-center pt-3 ">
        <Col >
          <Card className="shadow">
            <Card.Body className="mx-3">
              <div className="mb-2 text-center">
                <h2 className="fw-bold mb-2 ">Admin Menu</h2>
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
                      User Management
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={12}
                    className="d-flex p-2 mb-2 justify-content-center"
                  >
                    <Link
                      to={`/${AppRoutes.StravaWebhookManageMent}`}
                      className="primary-rounded-button text-decoration-none
                      "
                      style={{ width: '155px' }}
                    >
                      Strava Webhook Management
                    </Link>
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
