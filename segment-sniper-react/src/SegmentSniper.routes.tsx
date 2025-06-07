import { useEffect } from "react";
import {
  Routes as RRRoutes,
  Route,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Authentication/Register";
import { AppRoutes } from "./enums/AppRoutes";
import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import PrivateRoute from "./components/Organisms/Authentication/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Authentication/Logout";
import ConnectWithStravaSuccess from "./pages/ConnectWithStrava/Success";
import ConnectWithStravaError from "./pages/ConnectWithStrava/Error";
import SegmentSniper from "./pages/SegmentSniper/ActivityLookup";
import Admin from "./pages/Admin/Admin";
import { UserRole } from "./enums/Roles";
import ActivitySearchResults from "./pages/SegmentSniper/ActivitySearchResults";
import ActivityDetails from "./pages/SegmentSniper/ActivityDetails";
import ConfirmEmail from "./pages/Authentication/ConfirmEmail";
import ConfirmEmailCheckCode from "./pages/Authentication/ConfirmEmailCheckCode";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ProfileMain from "./components/Organisms/Profile/ProfileMain";
import SegmentPredictions from "./pages/SegmentPrediction";
import About from "./pages/About/About";
import GarageMenu from "./components/Organisms/GarageMenu/GarageMenu";
import AutoLoggedOut from "./pages/Authentication/AutoLoggedOut";
import BikeDetails from "./pages/Garage/BikeDetails";
import ManageStravaWebhook from "./pages/Admin/ManageStravaWebhook";

interface Props {
  defaultPage?: string;
}

export default function Routes({ defaultPage }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultPage) {
      navigate(defaultPage);
    }
    // else {
    //   const currentPathWithSearch = location.pathname + window.location.search;
    //   navigate(currentPathWithSearch);
    // }
  }, []);

  return (
    <>
      <RRRoutes>
        <Route path="/" element={<Outlet />}>
          <Route path={AppRoutes.Home} element={<Home />} />
          <Route path={AppRoutes.ForgotPassword} element={<ForgotPassword />} />
          <Route path={AppRoutes.ResetPassword} element={<ResetPassword />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route
            path={AppRoutes.ConfirmEmailCheckCode}
            element={<ConfirmEmailCheckCode />}
          />
          <Route
            path={AppRoutes.ConnectWithStravaSuccess}
            element={<ConnectWithStravaSuccess />}
          />
          <Route
            path={AppRoutes.ConnectWithStravaError}
            element={<ConnectWithStravaError />}
          />
          <Route
            path={AppRoutes.Logout}
            element={<Logout inactive={false} />}
          />
          <Route
            path={AppRoutes.InactiveLogout}
            element={<AutoLoggedOut />}
          />
          <Route path={AppRoutes.About} element={<About />} />
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
            path={AppRoutes.UserManagement}
            element={
              <PrivateRoute userRoles={[UserRole.Admin]}>
                <BikeDetails />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.StravaWebhookManageMent}
            element={
              <PrivateRoute userRoles={[UserRole.Admin]}>
                <ManageStravaWebhook />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.ConfirmEmail}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <ConfirmEmail />
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
            path={AppRoutes.Profile}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <ProfileMain />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.SegmentPredictor}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <SegmentPredictions />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.Garage}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <GarageMenu />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.BikeDetails}
            element={
              <PrivateRoute userRoles={[UserRole.User]}>
                <BikeDetails />
              </PrivateRoute>
            }
          />

        </Route>
      </RRRoutes>
    </>
  );
}
