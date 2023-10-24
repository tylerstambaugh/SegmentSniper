import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";

export default function MainMenu() {
  return (
    <>
      <Row className="d-flex justify-content-center ">
        <Col md={6} lg={6} xs={10}>
          <div className="border "></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-2 text-center">
                <h2 className="fw-bold mb-2 ">Main Menu</h2>

                <Row>
                  <Col
                    md={12}
                    className="d-flex p-2 mb-2 justify-content-center"
                  >
                    <Link
                      to={AppRoutes.Snipe}
                      className="primary-rounded-button
                      "
                      style={{ width: "155px" }}
                    >
                      Segment Sniper
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={12}
                    className="d-flex p-2 mb-2 justify-content-center"
                  >
                    <Link
                      to="./athlete"
                      className="primary-rounded-button
                      "
                      style={{ width: "155px" }}
                    >
                      Athlete Details
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col
                    md={12}
                    className="d-flex p-2 mb-2 justify-content-center"
                  >
                    <Link
                      to="./token-maintenance"
                      className="primary-rounded-button
                      "
                      style={{ width: "155px" }}
                    >
                      Admin
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
