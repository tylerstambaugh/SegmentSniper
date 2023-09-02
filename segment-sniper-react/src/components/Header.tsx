import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to={AppRoutes.Home}>
          <Navbar.Brand>Segment Sniper</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="d-flex justify-content-end">
            Signed in as: <Link to={AppRoutes.Login}>Bobe Sniper</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
