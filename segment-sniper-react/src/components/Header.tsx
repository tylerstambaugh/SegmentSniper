import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useUserStore from "../store/useUserStore";
import useTokenDataStore from "../store/useTokenStore";

function Header() {
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const [user] = useUserStore((state) => [state.user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to={AppRoutes.Home}>
          <Navbar.Brand>Segment Sniper</Navbar.Brand>
        </Link>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          {tokenData !== null && tokenData!.accessToken && user!.id ? (
            <div className="d-flex">
              <Navbar.Text className="pr-2">
                {`Signed in as: ${user!.firstName}`}
              </Navbar.Text>
              <Navbar.Text>
                <Link to={AppRoutes.Logout}>Logout</Link>
              </Navbar.Text>
            </div>
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
