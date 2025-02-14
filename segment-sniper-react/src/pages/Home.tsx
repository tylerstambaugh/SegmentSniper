import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../enums/AppRoutes';

function Home() {
  const navigate = useNavigate();
  return (
    <Col className="px-3">
      <Row>
        <Col className="text-center pt-1">
          <h4>
            Welcome to the <br /> Segment Sniper!
          </h4>
        </Col>
      </Row>
      <Row className=" justify-content-center text-center pt-1">
        <Col sm={12} md={7} sl={5} className="mb-3">
          <Card>
            <Card.Body className="  py-1">
              <div className="text-center" style={{ fontWeight: '600' }}>
                Are you a Strava athlete that spends too much time looking for
                segments to KOM? If so, this app is designed and built for you.
                <br />
              </div>
              <div className="text-center pt-2" style={{ fontSize: 13 }}>
                With proprietary analytics and data aggregations, the Strava
                Segment Sniper is the premier tool that will assist you into the
                top spot on the leader boards. <br />
              </div>
              <div className="text-center pt-2" style={{ fontSize: 13 }}>
                Whether it is harnessing the power of the wind, or uncovering
                the segments that you are close to #1, we're leveraging new
                technology in your quest to dominate your routes.
              </div>
              <Row className="text-center">
                <Col sm={12} className="m-0 pt-2">
                  <p>Are you ready to get started?</p>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Button onClick={() => navigate(`/${AppRoutes.Login}`)}>
                    Start Sniping!
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default Home;
