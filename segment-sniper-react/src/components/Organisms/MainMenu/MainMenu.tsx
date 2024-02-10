import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../enums/AppRoutes";
import useUserStore from "../../../stores/useUserStore";

export default function MainMenu() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <Row className="d-flex justify-content-center pt-3 ">
        <Col md={6} xs={10}>
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
                      to={`/${AppRoutes.Snipe}`}
                      className="primary-rounded-button text0decoration-none
                      "
                      style={{ width: "155px" }}
                    >
                      Segment Sniper
                    </Link>
                  </Col>
                </Row>
                {user?.roles?.some((r) => r.toString() === "Admin") ? (
                  <Row>
                    <Col
                      md={12}
                      className="d-flex p-2 mb-2 justify-content-center"
                    >
                      <Link
                        to={`/${AppRoutes.Admin}`}
                        className="primary-rounded-button
                      "
                        style={{ width: "155px" }}
                      >
                        Admin
                      </Link>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
