import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About/About';
import SignIn from './pages/Authentication/SignIn';
import SignUpPage from './pages/Authentication/SignUpPage';
import AutoLoggedOut from './pages/Authentication/AutoLoggedOut';
import Unauthorized from './components/Unauthorized';
import PrivateRoute from './components/Organisms/Authentication/PrivateRoute';
import Dashboard from './pages/Dashboard';
import SegmentSniper from './pages/SegmentSniper/ActivityLookup';
import ActivitySearchResults from './pages/SegmentSniper/ActivitySearchResults';
import ActivityDetails from './pages/SegmentSniper/ActivityDetails';
import SegmentPredictions from './pages/SegmentPrediction';
import GarageMenu from './components/Organisms/GarageMenu/GarageMenu';
import BikeDetails from './pages/Garage/BikeDetails';
import ConnectWithStrava from './components/Organisms/ConnectWithStrava/ConnectWithStrava';
import ConnectWithStravaSuccess from './pages/ConnectWithStrava/Success';
import ConnectWithStravaError from './pages/ConnectWithStrava/Error';
import Admin from './pages/Admin/Admin';
import ManageStravaWebhook from './pages/Admin/ManageStravaWebhook';
import UserManagement from './components/Organisms/Admin/ManageUsers';
import ViewAssignRoles from './components/Organisms/Admin/ManageUsers/ViewAssignRoles';
import { AppRoutes } from './enums/AppRoutes';
import { UserRole } from './enums/Roles';
import Pricing from './pages/Pricing/Pricing';
import BillingSuccess from './pages/Pricing/BillingSuccess';
import ErrorPage from './components/Atoms/ErrorPage';

const memberRoles = [UserRole.Member];
const adminRoles = [UserRole.Admin];

export default function AppRoutesComponent() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path={AppRoutes.Home} element={<Home />} />
      <Route path={AppRoutes.About} element={<About />} />
      <Route path={AppRoutes.Pricing} element={<Pricing />} />
      <Route path={`${AppRoutes.SignIn}/*`} element={<SignIn />} />
      <Route path={`${AppRoutes.SignUp}/*`} element={<SignUpPage />} />
      <Route path={AppRoutes.InactiveLogout} element={<AutoLoggedOut />} />
      <Route path={AppRoutes.Unauthorized} element={<Unauthorized />} />

      {/* ---------- MEMBER PROTECTED ---------- */}
      <Route
        element={<PrivateRoute userRoles={memberRoles} requireStravaSync />}
      >
        <Route path={AppRoutes.Dashboard} element={<Dashboard />} />
        <Route path={AppRoutes.BillingSuccess} element={<BillingSuccess />} />
        <Route path={AppRoutes.Snipe} element={<SegmentSniper />} />
        <Route
          path={AppRoutes.ActivitySearchResults}
          element={<ActivitySearchResults />}
        />
        <Route path={AppRoutes.ActivityDetails} element={<ActivityDetails />} />
        <Route
          path={AppRoutes.SegmentPredictor}
          element={<SegmentPredictions />}
        />
        <Route path={AppRoutes.Garage} element={<GarageMenu />} />
        <Route path={AppRoutes.BikeDetails} element={<BikeDetails />} />
        <Route
          path={AppRoutes.ConnectWithStrava}
          element={<ConnectWithStrava />}
        />
        <Route
          path={AppRoutes.ConnectWithStravaSuccess}
          element={<ConnectWithStravaSuccess />}
        />
        <Route
          path={AppRoutes.ConnectWithStravaError}
          element={<ConnectWithStravaError />}
        />
      </Route>

      {/* ---------- ADMIN PROTECTED ---------- */}
      <Route element={<PrivateRoute userRoles={adminRoles} />}>
        <Route path={AppRoutes.Admin} element={<Admin />} />
        <Route path={AppRoutes.UserManagement} element={<UserManagement />} />
        <Route path={AppRoutes.ViewAssignRoles} element={<ViewAssignRoles />} />
        <Route
          path={AppRoutes.StravaWebhookManageMent}
          element={<ManageStravaWebhook />}
        />
      </Route>

      {/* ---------- CATCH-ALL ---------- */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
