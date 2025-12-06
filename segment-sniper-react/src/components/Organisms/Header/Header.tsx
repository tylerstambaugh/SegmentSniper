import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../assets/images/segment_sniper_logo_v3.webp';
import { AppRoutes } from '../../../enums/AppRoutes';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { AuthContext } from '../../../context/authContext';

function Header() {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { roles } = useContext(AuthContext);

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

  const isAdmin = roles?.some((r) => r.toLowerCase() === 'admin');

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
          <SignedIn>
            <Link
              to={`/${AppRoutes.Dashboard}`}
              className="d-flex text-white text-decoration-none"
            >
              <img
                src={logo}
                alt="segmentSniperLogo"
                className="header-image p-0"
              />
            </Link>
          </SignedIn>
          <SignedOut>
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
          </SignedOut>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleNavbarToggle}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end align-items-end">
            {/* ----- When Signed In ----- */}
            <SignedIn>
              <Nav.Item className="fw-semibold text-end">
                <Navbar.Text>
                  <Link
                    to={`/${AppRoutes.Dashboard}`}
                    onClick={handleLinkClick}
                  >
                    Menu
                  </Link>
                </Navbar.Text>
              </Nav.Item>

              <div className="border-end mx-3 d-none d-md-block"></div>
              <Nav.Item className="fw-semibold text-end">
                <Navbar.Text>
                  <Link to={`/${AppRoutes.Pricing}`} onClick={handleLinkClick}>
                    Pricing
                  </Link>
                </Navbar.Text>
              </Nav.Item>

              <div className="border-end mx-3 d-none d-md-block"></div>
              <Nav.Item className="fw-semibold text-end">
                <Navbar.Text>
                  <Link to={`/${AppRoutes.About}`} onClick={handleLinkClick}>
                    About
                  </Link>
                </Navbar.Text>
              </Nav.Item>

              {/* Optional: admin shortcut */}
              {isAdmin && (
                <>
                  <div className="border-end mx-3 d-none d-md-block"></div>
                  <Nav.Item className="fw-semibold text-end">
                    <Navbar.Text>
                      <Link
                        to={`/${AppRoutes.Admin}`}
                        onClick={handleLinkClick}
                      >
                        Admin
                      </Link>
                    </Navbar.Text>
                  </Nav.Item>
                </>
              )}

              <div className="ms-3">
                <UserButton />
              </div>
            </SignedIn>

            {/* ----- When Signed Out ----- */}
            <SignedOut>
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

              <div className="ms-3">
                <SignInButton mode="modal">
                  <Button>Login</Button>
                </SignInButton>
              </div>
            </SignedOut>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
