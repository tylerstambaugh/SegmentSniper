import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SignedIn, SignedOut, useUser } from "@clerk/react-router";
import { UserRole } from "../../../enums/Roles";
import { AppRoutes } from "../../../enums/AppRoutes";

import type { JSX } from "react";

type Props = {
  children: JSX.Element;
  userRoles?: Array<string>;
};

const PrivateRoute = ({ children, userRoles = [] }: Props) => {
  const { user } = useUser();

  // Check roles from Clerk's publicMetadata
  const userHasRequiredRole =
    user &&
    (userRoles.length === 0 ||
      userRoles.some((role) => user.publicMetadata?.roles === role));

  return (
    <>
      <SignedOut>
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
      </SignedOut>

      <SignedIn>
        {!userHasRequiredRole ? (
          <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
            <Row className="text-center ">
              <Col>
                <p>You do not have permission to access this resource.</p>
                <Link to={`/${AppRoutes.Home}`}>
                  <Button>Home</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        ) : (
          children
        )}
      </SignedIn>
    </>
  );
};

export default PrivateRoute;
