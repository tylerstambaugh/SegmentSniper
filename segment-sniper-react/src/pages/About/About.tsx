import { Accordion, Col, Row } from 'react-bootstrap';
import AboutAuthor from '../../components/Organisms/About/AboutAuthor';

export type AboutPageComponentProps = {
  collapsed: boolean;
};

function About() {
  return (
    <Row className='pt-3 p-1'>
      <Col md={8} className="mb-2 mx-auto">
        <Accordion style={{ backgroundColor: '#f0f0f0' }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Meet The Maker</Accordion.Header>
            <Accordion.Body>
              <AboutAuthor />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>About Segment Sniper</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>About Segment Time Predictor</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}

export default About;
