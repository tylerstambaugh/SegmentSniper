import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import connectWithStravaImage from '../../../assets/stravaImages/btn_strava_connectwith_orange/btn_strava_connectwith_orange@2x.png';
import useUserStore from '../../../stores/useUserStore';
import useAppConfigStore from '../../../stores/useAppConfigStore';
import { useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
const baseUrl = window.origin;
const apiUrl = import.meta.env.VITE_SEGMENT_SNIPER_API_URL;

export default function ConnectWithStrava() {
  const { userId } = useContext(AuthContext);
  const appConfig = useAppConfigStore((state) => state.appConfig);

  async function handleConnectWithStrava() {
    const encodedRedirectUri = encodeURIComponent(
      `${apiUrl}/ConnectWithStrava/ExchangeToken/${userId}`,
    );

    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${appConfig?.clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&approval_prompt=force&scope=activity:read_all,activity:write,profile:read_all,profile:write`;
  }

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="d-flex justify-content-center pt-3 ">
        <Col xl={6} lg={8} md={10} sm={12} xs={12}>
          <Card className="shadow">
            <Card.Body className="mx-3">
              <div className="mb-2 text-center">
                <p>
                  Before you can start using the app, we need you to authorize
                  us to access your Strava data. When you click the button
                  below, you'll be redirected to Strava and asked to grant this
                  app permission to view your data. After accepting the
                  agreement, you'll be redirected back here.
                </p>

                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleConnectWithStrava()}
                    >
                      <img src={connectWithStravaImage} width={250} />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
