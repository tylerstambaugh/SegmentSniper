import { Container, Row, Col, Button } from "react-bootstrap";

import connectWithStravaImage from "../../assets/stravaImages/btn_strava_connectwith_orange/btn_strava_connectwith_orange@2x.png";
import useUserStore from "../../stores/useUserStore";
import useAppConfigStore from "../../stores/useAppConfigStore";
const baseUrl = window.origin;
const apiUrl = import.meta.env.VITE_SEGMENT_SNIPER_API_URL;

export default function ConnectWithStrava() {
  const user = useUserStore((state) => state.user);
  const appConfig = useAppConfigStore((state) => state.appConfig);

  async function handleConnectWithStrava() {
    const encodedRedirectUri = encodeURIComponent(
      `${apiUrl}/ConnectWithStrava/ExchangeToken/${user?.id}`
    );

    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${appConfig?.clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&approval_prompt=force&scope=activity:read_all,activity:write,profile:read_all,profile:write`;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row sm={2} className="text-center ">
        <Col className="mx-auto">
          <p>
            Before you can start sniping segments, we'll need you to authorize
            us to access your Strava data. When you click the below button,
            you'll be redirected to Strava and asked to grant this app
            permission to view our data. After accepting the agreement, you'll
            be redirected here and can begin sniping segments.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => handleConnectWithStrava()}
          >
            <img src={connectWithStravaImage} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
