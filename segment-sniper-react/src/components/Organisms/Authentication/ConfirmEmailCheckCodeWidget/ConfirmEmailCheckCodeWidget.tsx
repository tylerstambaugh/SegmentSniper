import { Row, Col, Spinner, Container, Button, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import useUserStore from "../../../../stores/useUserStore";
import { useEffect, useState } from "react";
import useTokenDataStore, { TokenData } from "../../../../stores/useTokenStore";

import { VerifyEmailConfirmationCodeRequest } from "../../../../services/Api/Auth/postVerifyEmailConfirmationCode";
import useRefreshTokenQuery from "../../../../hooks/Api/Auth/useRefreshTokenQuery";
import { CustomToast } from "../../../Molecules/Toast/CustomToast";
import { usePostCheckEmailVerificationCode } from "../../../../hooks/Api/Auth/usePostCheckEmailVerificationCode";

export default function ConfirmEmailCheckCodeWidget() {
  const setUser = useUserStore((state) => state.setUser);
  const refreshTokenQuery = useRefreshTokenQuery();
  const [tokenDataStore, setTokenDateStore, setIsAuthenticated] =
    useTokenDataStore((state) => [
      state.tokenData,
      state.setTokenData,
      state.setIsAuthenticated,
    ]);
  const checkVerificationCode = usePostCheckEmailVerificationCode();
  const [verificationComplete, setVerificationComplete] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("at");
    const refreshToken = searchParams.get("rt");
    const cleanedRefreshToken = refreshToken?.replace(/\s+/g, "+") ?? "";
    const confirmationToken = searchParams.get("confirmationToken");

    if (confirmationToken) {
      try {
        const fetchData = async () => {
          const now = new Date();
          const tempTokenData: TokenData = {
            accessToken: accessToken,
            refreshToken: cleanedRefreshToken,
            expiration: new Date(now.getTime() + 5 * 60 * 1000),
          };
          setTokenDateStore(tempTokenData);
          const request: VerifyEmailConfirmationCodeRequest = {
            confirmationToken: confirmationToken,
            accessToken: accessToken ?? "",
            refreshToken: tokenDataStore?.refreshToken ?? cleanedRefreshToken,
          };
          await checkVerificationCode
            .mutateAsync(request)
            .then((res) => {
              setUser(res.userData);
              setIsAuthenticated(true);
            });
          if (!checkVerificationCode.isError) {
            setVerificationComplete(true);
          }
          await refreshTokenQuery.refetch();
        };

        fetchData();
      } catch (error) {
        if (error instanceof Error) {
          CustomToast({
            message: "Error confirming email.",
            error: `Error: ${error.message}`,
            type: "error",
          });
        }
      }
    }
  }, [location.search]);

  return verificationComplete ? (
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Row>
              <Col className="m-1">
                <h4>You're verified, time to start sniping</h4>
                <Link to={`/${AppRoutes.Dashboard}`}>
                  <Button className="px-4">Snipe!</Button>
                </Link>{" "}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : checkVerificationCode.isError ? (
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Row>
              <Col>
                <h4>Invalid or expired link. Please log in and try again</h4>
                <Link to={`/${AppRoutes.Home}`}>
                  <Button className="px-4">Home</Button>
                </Link>{" "}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row className="justify-content-center text-center">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Row>
              <Col>
                <h2>Hang tight, we're making sure it's you.</h2>
              </Col>
            </Row>
            <Row>
              <Spinner
                as="span"
                variant="light"
                size="sm"
                role="status"
                aria-hidden="true"
                animation="border"
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
