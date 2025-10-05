
import { useContext, useMemo } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthSync } from "./AuthSync";
import { SessionCleanup } from "./SessionCleanUp";
import { AppRoutes } from "../../../enums/AppRoutes";
import { AuthContext } from "../../../context/authContext";


type Props = {
  userRoles?: string[];
  requireStravaSync?: boolean;
};

const PrivateRoute = ({ userRoles = [], requireStravaSync = false }: Props) => {
  const { roles } = useContext(AuthContext);

  const hasRequiredRole = useMemo(() => {
    if (userRoles.length === 0) return true;
    return userRoles.some((role) => roles.includes(role));
  }, [roles, userRoles]);

  if (!hasRequiredRole) {
    return (
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
    );
  }

  // Only wrap in AuthSync if Strava is required
  return requireStravaSync ? (
    <AuthSync>
      <Outlet />
    </AuthSync>
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
