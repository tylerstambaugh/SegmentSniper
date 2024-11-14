import { Card, Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy'

function AboutSegmentSniper() {
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <ReactPlayer url='https://www.youtube.com/watch?v=D0HyJBWQ9Qc' />
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default AboutSegmentSniper;
