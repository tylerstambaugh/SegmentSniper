import { Navigate, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const loading: boolean = true;
  const isAuthenticated: boolean = false;

  if (loading) {
    return (
      <>
        <p>Checking authenticaton..</p>
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
