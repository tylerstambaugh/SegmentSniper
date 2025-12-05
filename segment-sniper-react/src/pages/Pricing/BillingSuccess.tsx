import { useEffect } from 'react';
import { useSession, useUser } from '@clerk/clerk-react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AppRoutes } from '../../enums/AppRoutes';
import { useNavigate } from 'react-router';

export default function BillingSuccess() {
  const { user, isLoaded } = useUser();
  const { session } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoaded) return;

    (async () => {
      console.log('Reloading user and session after billing success');
      await user?.reload();
      await session?.reload();
    })();
  }, []);

  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="d-flex justify-content-center pt-3 ">
        <Col xl={6} lg={8} md={10} sm={12} xs={12}>
          <Card className="shadow">
            <Card.Body className="mx-3">
              <div className="mb-2 text-center">
                <h2 className="fw-bold mb-2 ">Subscription Updated</h2>
                <Row>
                  <Col className="d-flex p-2 mb-2 justify-content-center">
                    <Button
                      onClick={() => navigate(`/${AppRoutes.Dashboard}`)}
                      variant="primary"
                      className="mt-3"
                    >
                      Main Menu
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
