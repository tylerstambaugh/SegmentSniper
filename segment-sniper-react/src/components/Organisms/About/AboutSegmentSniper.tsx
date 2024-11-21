import { Card, Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player/lazy'

function AboutSegmentSniper() {
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Col>
              <Row>

                <p>The original inspiration for the app. The <span> Segment Sniper</span> uses proprietary logic and an intuitive interface to give you insights
                  into how to tackle the segment leaderboards. This video illustrated the ease of use and highlights of using the platform.</p>
                <ReactPlayer
                  width="100%"
                  url='https://www.youtube.com/watch?v=D0HyJBWQ9Qc' />
              </Row>
            </Col>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default AboutSegmentSniper;
