import { Card, Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy'

function AboutSegmentTimePredictor() {
  return (
    <>
      <Col>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default AboutSegmentTimePredictor;
