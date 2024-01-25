import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useUserStore from "../../stores/useUserStore";
import useTokenDataStore from "../../stores/useTokenStore";
import logo from "../../assets/images/segment_sniper_logo_v3.webp";
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
    <Navbar expand="lg">
      <Container fluid className={"py-2"}>
        <Navbar.Brand className={"ps-3"}>
          <Link
            to={
              !!isAuthenticated
                ? `/${AppRoutes.Home}`
                : `/${AppRoutes.Dashboard}`
            }
            className={"d-flex text-white text-decoration-none"}
          >
            {" "}
            <img
              src={logo}
              alt="segmentSniperLogo"
              className="header-image p-0"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100 d-flex justify-content-end">
            <div className={"border-top mt-3 mb-3 d-lg-none "}></div>
            {tokenData !== null &&
            tokenData!.accessToken &&
            user !== null &&
            user!.id ? (
              <>
                <Nav.Item className={""}>
                  <Navbar.Text>{`Signed in as: ${
                    user!.firstName
                  }`}</Navbar.Text>
                </Nav.Item>
                <div className={"border-end mx-3 d-none d-lg-block"}></div>
                <div className={"border-top mt-3 d-lg-none"}></div>
                <Nav.Item className={"pe-4 fw-semibold"}>
                  <Navbar.Text className="ps-5">
                    <Link to={`/${AppRoutes.Logout}`} onClick={handleLinkClick}>
                      Logout
                    </Link>
                  </Navbar.Text>
                </Nav.Item>
              </>
            ) : (
              <>
                <div className={"d-flex justify-content-end pt-3 pt-lg-0"}>
                  <Nav.Item className={"pe-4 fw-semibold"}>
                    <Navbar.Text className="d-flex">
                      <Link
                        to={`/${AppRoutes.Login}`}
                        onClick={handleLinkClick}
                      >
                        Login
                      </Link>
                    </Navbar.Text>
                  </Nav.Item>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
