import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/segment_sniper_logo_v3.webp';
import { AppRoutes } from '../../../enums/AppRoutes';

function ErrorHeader() {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const handleNavbarToggle = () => setNavbarOpen(!isNavbarOpen);
  const handleLinkClick = () => setNavbarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        isNavbarOpen &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isNavbarOpen]);

  return (
    <Navbar
      expand="md"
      ref={navbarRef}
      expanded={isNavbarOpen}
      bg="light"
      className="pb-0"
    >
      <Container fluid>
        {/* Brand / Logo */}
        <Navbar.Brand className="ps-3">
          <Link
            to={`/${AppRoutes.Home}`}
            className="d-flex text-white text-decoration-none"
          >
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
          <Nav className="w-100 d-flex justify-content-end align-items-end">
            <Nav.Item className="fw-semibold pe-2">
              <Navbar.Text className="d-flex">
                <Link to={`/${AppRoutes.About}`} onClick={handleLinkClick}>
                  About
                </Link>
              </Navbar.Text>
            </Nav.Item>
            <Nav.Item className="fw-semibold">
              <Navbar.Text className="d-flex">
                <Link to={`/${AppRoutes.Pricing}`} onClick={handleLinkClick}>
                  Pricing
                </Link>
              </Navbar.Text>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ErrorHeader;
