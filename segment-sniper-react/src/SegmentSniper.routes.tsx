import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import { AppRoutes } from "./enums/AppRoutes";

import PrivateRoute from "./components/Organisms/Authentication/PrivateRoute";
import Dashboard from "./pages/Dashboard";

import ConnectWithStravaSuccess from "./pages/ConnectWithStrava/Success";
import ConnectWithStravaError from "./pages/ConnectWithStrava/Error";
import SegmentSniper from "./pages/SegmentSniper/ActivityLookup";
import Admin from "./pages/Admin/Admin";
import { UserRole } from "./enums/Roles";
import ActivitySearchResults from "./pages/SegmentSniper/ActivitySearchResults";
import ActivityDetails from "./pages/SegmentSniper/ActivityDetails";

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
      <Route path={AppRoutes.ConnectWithStravaError} element={<ConnectWithStravaError />} />
      <Route path={AppRoutes.InactiveLogout} element={<AutoLoggedOut />} />

      {/* User-protected routes */}
      <Route element={<PrivateRoute userRoles={[UserRole.User]} />}>
        <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
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
