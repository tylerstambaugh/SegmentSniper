import { Col, Container, Row } from "react-bootstrap";
import useUserStore from "../store/useUserStore";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <h3>the "dashboard"</h3>
      <Container
        className="d-flex flex-column justify-content-center mb-2 bg-light text-dark border rounded mx-auto "
        style={{ width: "50%" }}
      >
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
