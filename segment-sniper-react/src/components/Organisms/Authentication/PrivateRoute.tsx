// PrivateRoute.tsx
import { Link, Outlet } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SignedIn, SignedOut, useUser } from "@clerk/react-router";
import { AppRoutes } from "../../../enums/AppRoutes";
import { AuthSync } from "./AuthSync";
import { SessionCleanup } from "./SessionCleanUp";

type Props = {
  userRoles?: Array<string>;
  requireStravaSync?: boolean; // ✅ new prop
};

const PrivateRoute = ({ userRoles = [], requireStravaSync = false }: Props) => {
  const { user } = useUser();

  const roles = user?.publicMetadata?.roles;
  const roleArray = Array.isArray(roles) ? roles : roles ? [roles] : [];

  const userHasRequiredRole =
    user && (userRoles.length === 0 || userRoles.some((role) => roleArray.includes(role)));

  return (
    <>
      <SignedOut>
        <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
          <SessionCleanup />
          <Row className="text-center">
            <Col>
              <p>You must be logged in to access this resource.</p>
              <Link to={AppRoutes.SignIn}>
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
                <Link to={AppRoutes.Home}>
                  <Button>Home</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        ) : requireStravaSync ? (

          <AuthSync>
            <Outlet />
          </AuthSync>
        ) : (
          <Outlet />
        )}
      </SignedIn>
    </>
  );
};

export default PrivateRoute;
