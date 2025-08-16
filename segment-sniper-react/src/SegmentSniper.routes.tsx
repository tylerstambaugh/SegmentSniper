import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
import SegmentPredictions from "./pages/SegmentPrediction";
import About from "./pages/About/About";
import GarageMenu from "./components/Organisms/GarageMenu/GarageMenu";
import AutoLoggedOut from "./pages/Authentication/AutoLoggedOut";
import BikeDetails from "./pages/Garage/BikeDetails";
import ManageStravaWebhook from "./pages/Admin/ManageStravaWebhook";


export default function AppRoutesComponent() {

  return (
    <Routes>
      {/* Public routes */}
      <Route path={AppRoutes.Home} element={<Home />} />
      <Route path={AppRoutes.About} element={<About />} />
      <Route path={AppRoutes.Login} element={<Login />} />
      <Route path={AppRoutes.Register} element={<Register />} />
      <Route path={AppRoutes.ForgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.ResetPassword} element={<ResetPassword />} />
      <Route path={AppRoutes.ConfirmEmailCheckCode} element={<ConfirmEmailCheckCode />} />
      <Route path={AppRoutes.ConnectWithStravaError} element={<ConnectWithStravaError />} />
      <Route path={AppRoutes.InactiveLogout} element={<AutoLoggedOut />} />

      {/* User-protected routes */}
      <Route element={<PrivateRoute userRoles={[UserRole.User]} />}>
        <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.ConfirmEmail} element={<ConfirmEmail />} />
        <Route path={AppRoutes.Snipe} element={<SegmentSniper />} />
        <Route path={AppRoutes.ActivitySearchResults} element={<ActivitySearchResults />} />
        <Route path={AppRoutes.ActivityDetails} element={<ActivityDetails />} />
        <Route path={AppRoutes.SegmentPredictor} element={<SegmentPredictions />} />
        <Route path={AppRoutes.Garage} element={<GarageMenu />} />
        <Route path={AppRoutes.BikeDetails} element={<BikeDetails />} />
        <Route path={AppRoutes.ConnectWithStravaSuccess} element={<ConnectWithStravaSuccess />} />
      </Route>

      {/* Admin-protected routes */}
      <Route element={<PrivateRoute userRoles={[UserRole.Admin]} />}>
        <Route path={AppRoutes.Admin} element={<Admin />} />
        <Route path={AppRoutes.UserManagement} element={<BikeDetails />} />
        <Route path={AppRoutes.StravaWebhookManageMent} element={<ManageStravaWebhook />} />
      </Route>
    </Routes>
  );
}
