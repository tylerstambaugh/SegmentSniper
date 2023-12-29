import { Row, Col, Spinner, Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import useUserStore from "../../stores/useUserStore";
import { useEffect } from "react";
import { useGetSendEmailConfirmation } from "../../hooks/Api/Auth/useGetSendEmailConfirmation";
import { usePostLogin } from "../../hooks/Api/Auth/usePostLogin";
import useTokenDataStore, { TokenData } from "../../stores/useTokenStore";
import { usePostCheckEmailVerificationCode } from "../../hooks/Api/Auth/usePostCheckEmailVerificationCode";
import { VerifyEmailConfirmationCodeRequest } from "../../services/Api/Auth/postVerifyEmailConfirmationCode";

export default function ConfirmEmailCheckCodeWidget() {
  const user = useUserStore((state) => state.user);
  const [setTokenDateStore, setIsAuthenticated] = useTokenDataStore((state) => [
    state.setTokenData,
    state.setIsAuthenticated,
  ]);
  const params = useParams();
  const confirmToken = params.t;
  const accessToken = params.at;
  const refreshToken = params.rt;
  const checkVerificationCode = usePostCheckEmailVerificationCode();

  useEffect(() => {
    if (accessToken && refreshToken) {
      let tokenData: TokenData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiration: new Date(Date.now() + 30 * 60 * 1000),
      };
      setTokenDateStore(tokenData);
      setIsAuthenticated(true);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (confirmToken && confirmToken !== null) {
      const fetchData = async () => {
        let request: VerifyEmailConfirmationCodeRequest = {
          confirmationCode: confirmToken,
        };
        checkVerificationCode.mutateAsync(request);
      };

      fetchData();
    }
  }, [confirmToken]);

  return confirmToken && checkVerificationCode.isLoading ? (
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
    <></>
  );
}
