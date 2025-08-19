import { Link, Outlet } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SignedIn, SignedOut, useUser } from "@clerk/react-router";
import { AppRoutes } from "../../../enums/AppRoutes";

type Props = {
  userRoles?: Array<string>;
};

const PrivateRoute = ({ userRoles = [] }: Props) => {
  const { user } = useUser();

  const userHasRequiredRole =
    user &&
    (userRoles.length === 0 ||
      userRoles.some((role) =>
        Array.isArray(user.publicMetadata?.roles)
          ? user.publicMetadata.roles.includes(role)
          : user.publicMetadata?.roles === role
      ));

  return (
    <>
      <SignedOut>
        <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
          <Row className="text-center">
            <Col>
              <p>You must be logged in to access this resource.</p>
              <Link to={`/${AppRoutes.SignIn}`}>
                <Button>Login</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </SignedOut>

      <SignedIn>
        {!userHasRequiredRole ? (
          <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
            <Row className="text-center">
              <Col>
                <p>You do not have permission to access this resource.</p>
                <Link to={`/${AppRoutes.Home}`}>
                  <Button>Home</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        ) : (
          <Outlet />
        )}
      </SignedIn>
    </>
  );
};

export default PrivateRoute;
