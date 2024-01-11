import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import useTokenDataStore from "../../../stores/useTokenStore";
import { UserRole } from "../../../enums/Roles";
import useUserStore from "../../../stores/useUserStore";
import { AppRoutes } from "../../../enums/AppRoutes";

type Props = {
  children: JSX.Element;
  userRoles?: Array<UserRole>;
};

const PrivateRoute = (props: Props) => {
  const [isAuthenticated] = useTokenDataStore((state) => [
    state.isAuthenticated,
  ]);
  const user = useUserStore((state) => state.user);

  const userHasRequiredRole =
    user && props.userRoles?.every((role) => user.roles?.includes(role))
      ? true
      : false;

  if (!isAuthenticated || user === null) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
        <Row className="text-center ">
          <Col>
            <p>You must be logged in to access this resource.</p>
            <Link to={`/${AppRoutes.Login}`}>
              <Button>Login</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
        <Row className="text-center ">
          <Col>
            <p>You do have permission to access this resource.</p>
            <Link to={`/${AppRoutes.Home}`}>
              <Button>Home</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isAuthenticated && userHasRequiredRole) return props.children;
};

export default PrivateRoute;
