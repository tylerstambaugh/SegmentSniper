import { useEffect } from "react";
import {
  Routes as RRRoutes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { AppRoutes } from "./enums/AppRoutes";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import ConnectWithStravaSuccess from "./pages/ConnectWithStrava/Success";
import ConnectWithStravaError from "./pages/ConnectWithStrava/Error";
import SegmentSniper from "./pages/SegmentSniper";
import Admin from "./pages/Admin";
import { UserRole } from "./enums/Roles";
import ActivitySearchResults from "./pages/ActivitySearchResults";
import SnipedSegments from "./pages/SnipedSegments";
import ActivityDetails from "./pages/ActivityDetails";

interface Props {
  defaultPage?: string;
}

export default function Routes({ defaultPage }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (defaultPage) {
      navigate(defaultPage);
    } else {
      navigate(location.pathname);
    }
  }, []);

  return (
    <>
      <RRRoutes>
        <Route path="/" element={<Outlet />}>
          <Route path={AppRoutes.Home} element={<Home />} />
          <Route path={AppRoutes.ForgotPassword} element={<ForgotPassword />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Logout} element={<Logout />} />
          <Route
            path={AppRoutes.ConnectWithStravaSuccess}
            element={<ConnectWithStravaSuccess />}
          />
          <Route
            path={AppRoutes.ConnectWithStravaError}
            element={<ConnectWithStravaError />}
          />
          <Route path={AppRoutes.Logout} element={<Logout />} />
          <Route
            path={AppRoutes.Dashboard}
            element={
              <PrivateRoute userRoles={[]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Admin}
            element={
              <PrivateRoute userRoles={[UserRole.Admin]}>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Snipe}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <SegmentSniper />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.ActivitySearchResults}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <ActivitySearchResults />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.ActivityDetails}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <ActivityDetails />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.SnipedSegments}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <SnipedSegments />
              </PrivateRoute>
            }
          />
        </Route>
      </RRRoutes>
    </>
  );
}
