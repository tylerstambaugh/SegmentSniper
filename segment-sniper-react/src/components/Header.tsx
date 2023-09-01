import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/appRoutes";

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#app">Segment Sniper</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <Link to={AppRoutes.Login}>Bobe Sniper</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
