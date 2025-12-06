import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import Unauthorized from '../../Unauthorized';
import { AuthSync } from './AuthSync';

type Props = {
  userRoles?: string[];
  requireStravaSync?: boolean;
};

const PrivateRoute = ({ userRoles = [], requireStravaSync = false }: Props) => {
  const { isLoaded, isSignedIn, roles } = useContext(AuthContext);

  if (!isLoaded) return null;

  if (!isSignedIn) return <Unauthorized />;

  const hasRequiredRole =
    userRoles.length === 0 ||
    userRoles.some((required) => roles.includes(required));

  if (!hasRequiredRole) return <Unauthorized />;

  // Optional StravaSync wrapper
  return requireStravaSync ? (
    <AuthSync>
      <Outlet />
    </AuthSync>
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
