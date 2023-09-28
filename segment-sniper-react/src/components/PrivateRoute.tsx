import { Link, Navigate, Route, redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useTokenDataStore from "../store/useTokenStore";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [tokenData, isAuthenticated] = useTokenDataStore((state) => [
    state.tokenData,
    state.isAuthenticated,
  ]);

  if (!isAuthenticated) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
        <Row className="text-center ">
          <Col>
            <p>You must be logged in to access this resource.</p>
            <Link to="/app/login">
              <Button>Login</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return children;
};

export default PrivateRoute;
