import { Card, Col, Row } from 'react-bootstrap';
import YouTube from 'react-youtube';

function AboutSegmentSniper() {
  return (
    <>
      <Col>
        <Row>
          <Col>
            <Card>             
              <Card.Body>
              <YouTube videoId="IEDEtZ4UVtI"/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default AboutSegmentSniper;
