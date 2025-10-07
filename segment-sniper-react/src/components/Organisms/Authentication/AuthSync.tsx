import { useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetMeQuery from "../../../hooks/Api/User/useGetMe";
import { AppRoutes } from "../../../enums/AppRoutes";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../../../context/authContext";

export const AuthSync = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const isSignedIn = !!userId;
  

  // Only enable query when the user is truly ready
  const { data, isLoading, isError } = useGetMeQuery({
    enabled: !!isSignedIn && !!userId,
  });

  // Run sync logic only when necessary
  useEffect(() => {
    if (!isSignedIn) {
      setChecked(true);
      return;
    }

    if (isLoading) return;

    if (isError) {
      navigate(AppRoutes.Unauthorized, { replace: true });
      setChecked(true);
      return;
    }

    const refreshToken = data?.stravaRefreshToken;
    const path = location.pathname;

    if (!refreshToken && path !== `/${AppRoutes.ConnectWithStrava}`) {
      navigate(AppRoutes.ConnectWithStrava, { replace: true });
      setChecked(true);
      return;
    }

    if (refreshToken && path === `/${AppRoutes.ConnectWithStrava}`) {
      navigate(AppRoutes.Dashboard, { replace: true });
    }

    setChecked(true);
  }, [isSignedIn, isLoading, isError, data?.stravaRefreshToken, navigate, location.pathname]);

  // ❌ Removed refetch() effect — React Query handles refetch on focus automatically
  // If you absolutely need to force it once on mount, do it conditionally:
  // useEffect(() => { if (isSignedIn && userId) refetch(); }, [isSignedIn, userId]);

  if (isSignedIn && (!checked || isLoading)) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center py-5">
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status" />
          </Col>
        </Row>
      </Container>
    );
  }

  return <>{children}</>;
};
