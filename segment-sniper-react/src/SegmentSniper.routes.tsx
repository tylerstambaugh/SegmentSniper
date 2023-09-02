import { useEffect } from "react";
import {
  Routes as RRRoutes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import SegmentSniper from "./SegmentSniper";
import Register from "./pages/Register";
import Login from "./pages/Home";
import { AppRoutes } from "./enums/AppRoutes";
import "./index.css";
import "./App.css";

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
        <Route path="/app" element={<Outlet />}>
          <Route path={AppRoutes.Home} element={<SegmentSniper />} />
          <Route path={AppRoutes.Register} element={<Register />} />
          <Route path={AppRoutes.Login} element={<Login />} />
        </Route>
      </RRRoutes>
    </>
  );
}
