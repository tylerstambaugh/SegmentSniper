import { Card, Col, Row } from 'react-bootstrap';
import styles from './about.module.scss';
import authorImage from '../../../assets/images/about/Bobe_Bike.jpg'

function AboutAuthor() {
  return (
    <>
      <Col>
        <Card>
          <Card.Body>
            <Row className='flex-row justify-content-between'>
              <Col>
                <h4>Meet Bobe</h4>
                <p>A long time bicycle and technology enthusiast, I was struck with the idea for the Segment Sniper
                  while clamoring up the leaderboards and looking for a project to work on to showcase my skills as a web developer.
                  Whether its road, track, gravel, or trail you can be sure I'm turning crank and trying to keep it rubber side down.</p>
              </Col>
              <Col md={6} className="justify-content-end">
                <img src={authorImage} alt="authorImage" className={`${styles.author_image}`} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default AboutAuthor;
