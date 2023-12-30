import { Row, Col, Spinner, Container, Button } from "react-bootstrap";
import { useParams, Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import useUserStore from "../../stores/useUserStore";
import { useEffect, useState } from "react";
import useTokenDataStore, { TokenData } from "../../stores/useTokenStore";
import { usePostCheckEmailVerificationCode } from "../../hooks/Api/Auth/usePostCheckEmailVerificationCode";
import { VerifyEmailConfirmationCodeRequest } from "../../services/Api/Auth/postVerifyEmailConfirmationCode";

export default function ConfirmEmailCheckCodeWidget() {
  const user = useUserStore((state) => state.user);
  const [setTokenDateStore, setIsAuthenticated] = useTokenDataStore((state) => [
    state.setTokenData,
    state.setIsAuthenticated,
  ]);
  const checkVerificationCode = usePostCheckEmailVerificationCode();
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("at");
    const refreshToken = searchParams.get("rt");
    const confirmationToken = searchParams.get("confirmationToken");
    console.log("confirmationToken:", searchParams.get("confirmationToken"));
    console.log("accessToken:", searchParams.get("at"));
    console.log("refreshToken:", searchParams.get("rt"));

    if (accessToken && refreshToken) {
      let tokenData: TokenData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiration: new Date(Date.now() + 30 * 60 * 1000),
      };
      setTokenDateStore(tokenData);
      setIsAuthenticated(true);
    }

    if (confirmationToken) {
      const fetchData = async () => {
        let request: VerifyEmailConfirmationCodeRequest = {
          confirmationToken: confirmationToken,
        };
        checkVerificationCode.mutateAsync(request);
      };

      fetchData();
    }
  }, [location.search]);

  return confirmationCode === null || checkVerificationCode.isLoading ? (
    <Row>
      <Col>
        <h2>Hang tight, we're making sure it's you.</h2>
        <Spinner
          as="span"
          variant="light"
          size="sm"
          role="status"
          aria-hidden="true"
          animation="border"
        />
      </Col>
    </Row>
  ) : checkVerificationCode.data?.success ? (
    <Container>
      <Row>
        <Col>
          <h4>You're verified, time to start sniping</h4>
          <Link to={`/${AppRoutes.SnipedSegments}`}>
            <Button className="px-4">Snipe!</Button>
          </Link>{" "}
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>Something ain't right. Please try again</h4>
          <Link to={`/${AppRoutes.ConfirmEmail}`}>
            <Button className="px-4">Try Again</Button>
          </Link>{" "}
        </Col>
      </Row>
    </Container>
  );
}
