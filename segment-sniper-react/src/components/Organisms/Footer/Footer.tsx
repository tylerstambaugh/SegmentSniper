import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStrava,
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <p>Copyright 2023 Tyler Stambaugh</p>
          </Col>
          <Col>
            <a href="mailto:segmentsniper@gmail.com" target="_blank">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </Col>

          <Col>
            <a href="https://github.com/tylerstambaugh">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Col>
          <Col>
            <a href="https://www.strava.com/athletes/381648">
              <FontAwesomeIcon icon={faStrava} />
            </a>
          </Col>
          <Col>
            <a href="https://www.strava.com/athletes/381648">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
          <Col>
            <a href="https://www.linkedin.com/in/tyler-stambaugh-b274a59/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
