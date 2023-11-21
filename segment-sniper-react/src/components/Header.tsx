import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { Col, Navbar, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useUserStore from "../stores/useUserStore";
import useTokenDataStore from "../stores/useTokenStore";
import logo from "../assets/images/segment_sniper_logo.svg";

function Header() {
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const [user] = useUserStore((state) => [state.user]);

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Link to={AppRoutes.Home}>
          <Navbar.Brand>
            {" "}
            <img
              src={logo}
              alt="segmentSniperProLogo"
              className="header-image"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          {tokenData !== null && tokenData!.accessToken && user!.id ? (
            <Row className="d-flex">
              <Col md={9} className="d-flex justify-content-end">
                <Navbar.Text>{`Signed in as: ${user!.firstName}`}</Navbar.Text>
              </Col>
              <Col md={3} className="d-flex justify-content-end">
                <Navbar.Text className="ps-5">
                  <Link to={AppRoutes.Logout}>Logout</Link>
                </Navbar.Text>
              </Col>
            </Row>
          ) : (
            <Navbar.Text className="d-flex">
              <Link to={AppRoutes.Login}>Login</Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
