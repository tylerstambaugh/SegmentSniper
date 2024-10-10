import { Card, Col, Row } from 'react-bootstrap';
import authorImage from '../../../assets/images/about/bobe_author_image.png';
import styles from './about.module.scss';

function AboutAuthor() {
  return (
    <>
      <Col>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row className='d-flex'>
                  <Col>
                    <h3>Meet Bobe.</h3>
                  </Col>
                  <Col className={` ${styles.author_image}`}>
                    <img src={authorImage} alt="authorImage" className="" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default AboutAuthor;
