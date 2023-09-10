import { Link, Navigate, Route, redirect, useLocation } from "react-router-dom";
import { useNeuron } from "../store/AppStore";
import { Token } from "../store/types/token";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useNeuron<Token>("tokenData");

  useEffect(() => {
    if (token.expiration !== null && token.expiration.getTime() > Date.now()) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [token]);

  if (!isAuthenticated) {
    return (
      <>
        <p>you must be logged in to access this resource.</p>
        <Link to="/app/login">
          <Button>Login</Button>
        </Link>
      </>
    );
  }

  return children;
};

export default PrivateRoute;
