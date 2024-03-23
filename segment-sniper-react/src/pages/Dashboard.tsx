import { Col, Container, Row } from "react-bootstrap";
import useUserStore from "../stores/useUserStore";
import MainMenu from "../components/Organisms/MainMenu/MainMenu";
import ConnectWithStrava from "../components/Organisms/ConnectWithStrava/ConnectWithStrava";
import { useGetUserHasStravaToken } from "../hooks/Api/Auth/useGetHasStravaToken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "../components/Molecules/Toast/CustomToast";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const checkUserHasTokenData = useGetUserHasStravaToken();
  const navigate = useNavigate();

  async function checkUserHasTokenDataFunc() {
    await checkUserHasTokenData.mutateAsync();
  }

  useEffect(() => {
    if (!user?.hasStravaTokenData) {
      checkUserHasTokenDataFunc();
    }
  }, []);

  useEffect(() => {
    if (checkUserHasTokenData.error !== null) {
      if (checkUserHasTokenData.error instanceof Error) {
        CustomToast({
          message: "Error checking Strava token",
          error: `Error: ${checkUserHasTokenData.error.message}`,
          type: "error",
        });
      }
    }
  }, [checkUserHasTokenData.error!]);

  useEffect(() => {
    if (!user?.verifiedEmail) {
      navigate("/confirm-email");
    }
  }, []);

  return (
    <>
      <Container
        className="d-flex flex-column justify-content-center"
        style={{ width: "auto" }}
      >
        {user?.hasStravaTokenData ? (
          <Row>
            <Col>
              <MainMenu />
            </Col>
          </Row>
        ) : (
          <ConnectWithStrava />
        )}
      </Container>
    </>
  );
}
