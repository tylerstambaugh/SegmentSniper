import { Link, Navigate, Route, redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useTokenDataStore from "../store/useTokenStore";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [tokenData, isAuthenticated] = useTokenDataStore((state) => [
    state.tokenData,
    state.isAuthenticated,
  ]);

  if (!isAuthenticated) {
    return (
      <>
        <p>You must be logged in to access this resource.</p>
        <Link to="/app/login">
          <Button>Login</Button>
        </Link>
      </>
    );
  }

  return children;
};

export default PrivateRoute;
