import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNeuron } from "../store/AppStore";
import { Token } from "../store/types/token";
import { User } from "../store/types/user";

function Header() {
  const [tokenData] = useNeuron<Token>("tokenData");
  const [user] = useNeuron<User>("user");
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to={AppRoutes.Home}>
          <Navbar.Brand>Segment Sniper</Navbar.Brand>
        </Link>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          {tokenData.accessToken && user.id ? (
            <Navbar.Text className="d-flex justify-content-end">
              Signed in as: {user.firstName}
            </Navbar.Text>
          ) : (
            <Navbar.Text className="d-flex justify-content-end">
              <Link to={AppRoutes.Login}>Login</Link>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
