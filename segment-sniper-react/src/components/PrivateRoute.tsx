import { Link, Navigate, Route, redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useTokenDataStore from "../store/useTokenStore";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);

  useEffect(() => {
    if (
      tokenData!.expiration !== null &&
      tokenData!.expiration.getTime() > Date.now()
    ) {
      setIsAuthenticated(true);
    }
  }, [tokenData]);

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
