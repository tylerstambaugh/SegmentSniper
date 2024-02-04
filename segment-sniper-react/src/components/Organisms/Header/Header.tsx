import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../enums/AppRoutes";
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useUserStore from "../../../stores/useUserStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import logo from "../../../assets/images/segment_sniper_logo_v3.webp";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [tokenData, isAuthenticated] = useTokenDataStore((state) => [
    state.tokenData,
    state.isAuthenticated,
  ]);
  const [user] = useUserStore((state) => [state.user]);
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef(null);
  const handleNavbarToggle = () => setNavbarOpen(!isNavbarOpen);
  const handleLinkClick = () => setNavbarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        isNavbarOpen &&
        !(navbarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navbarRef, isNavbarOpen]);

  return (
    <Navbar
      expand="md"
      ref={navbarRef}
      expanded={isNavbarOpen}
      bg="light"
      className="pb-0"
    >
      <Container fluid className={""}>
        <Navbar.Brand className={"ps-3"}>
          <Link
            to={
              !isAuthenticated
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
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleNavbarToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end">
            {tokenData !== null &&
            tokenData!.accessToken &&
            user !== null &&
            user!.id ? (
              <>
                <Nav.Item className={"text-end"}>
                  <Navbar.Text>
                    Signed in as:{" "}
                    <Link to={`/${AppRoutes.Profile}`}>{user!.firstName}</Link>
                    {}
                  </Navbar.Text>
                </Nav.Item>
                <div className={"border-end mx-3 d-none d-md-block"}></div>
                <div className={"border-top mt-1 d-md-none"}></div>
                <Nav.Item className={"fw-semibold text-end"}>
                  <Navbar.Text className="">
                    <Link to={`/${AppRoutes.Logout}`} onClick={handleLinkClick}>
                      Logout
                    </Link>
                  </Navbar.Text>
                </Nav.Item>
              </>
            ) : (
              <>
                <div className={"d-flex justify-content-end pt-md-0"}>
                  <Nav.Item className={"fw-semibold"}>
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
