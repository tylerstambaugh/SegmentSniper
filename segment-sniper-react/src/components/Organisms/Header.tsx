import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import { Col, Navbar, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useUserStore from "../../stores/useUserStore";
import useTokenDataStore from "../../stores/useTokenStore";
import logo from "../../assets/images/segment_sniper_logo.svg";
import { useState } from "react";

function Header() {
  const [tokenData, isAuthenticated] = useTokenDataStore((state) => [
    state.tokenData,
    state.setIsAuthenticated,
  ]);
  const [user] = useUserStore((state) => [state.user]);

  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarToggle = () => setNavbarOpen(!isNavbarOpen);

  const handleLinkClick = () => setNavbarOpen(false);

  return (
    <Navbar
      bg="light"
      expand="md"
      expanded={isNavbarOpen}
      onSelect={handleLinkClick}
    >
      <Col>
        <Row className="d-flex-inline">
          <Col xs={7}>
            <Link
              to={
                !!isAuthenticated
                  ? `/${AppRoutes.Home}`
                  : `/${AppRoutes.Dashboard}`
              }
            >
              <Navbar.Brand>
                {" "}
                <img
                  src={logo}
                  alt="segmentSniperLogo"
                  className="header-image p-0"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs={5} className="text-end pt-3">
            <Navbar.Toggle
              onClick={handleNavbarToggle}
              onBlur={handleNavbarToggle}
            />
            <Navbar.Collapse className="justify-content-end">
              {tokenData !== null &&
              tokenData!.accessToken &&
              user !== null &&
              user!.id ? (
                <Row className="d-flex">
                  <Col md={9} className="d-flex justify-content-end">
                    <Navbar.Text>{`Signed in as: ${
                      user!.firstName
                    }`}</Navbar.Text>
                  </Col>
                  <Col md={3} className="d-flex justify-content-end">
                    <Navbar.Text className="ps-5">
                      <Link
                        to={`/${AppRoutes.Logout}`}
                        onClick={handleLinkClick}
                      >
                        Logout
                      </Link>
                    </Navbar.Text>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={3} className="d-flex justify-content-end">
                    <Navbar.Text className="d-flex">
                      <Link
                        to={`/${AppRoutes.Login}`}
                        onClick={handleLinkClick}
                      >
                        Login
                      </Link>
                    </Navbar.Text>
                  </Col>
                </Row>
              )}
            </Navbar.Collapse>
          </Col>
        </Row>
      </Col>
    </Navbar>
  );
}

export default Header;
