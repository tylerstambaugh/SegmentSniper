import { Accordion, Col, Row } from 'react-bootstrap';
import AboutAuthor from '../../components/Organisms/About/AboutAuthor';

export type AboutPageComponentProps = {
  collapsed: boolean;
};

function AboutLandingPage() {
  return (
    <Row>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>About the Author</Accordion.Header>
            <Accordion.Body>
              <AboutAuthor />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>About Segment Sniper</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Segment Time Predictor</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}

export default AboutLandingPage;
