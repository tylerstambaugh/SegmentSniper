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
import styles from './footer.module.scss';
import '../../../App.css';

export const Footer: React.FC = () => {
  return (
    <footer
      className={`${styles.footer} d-flex flex-column justify-content-center align-items-center mt-auto`}
    >
      <Container>
        <Row
          className="d-flex justify-content-center px-5"
          style={{
            width: '100%',
          }}
        >
          <Col className="d-flex justify-content-center">
            <a href="mailto:segmentsniper@gmail.com" target="_blank">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="xs"
                className={`${styles.fa_icon}`}
              />
            </a>
          </Col>
          <Col className="d-flex justify-content-center">
            <a
              href="https://github.com/tylerstambaugh"
              target="_blank"
              className={`${styles.fa_icon}`}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Col>
          <Col className="d-flex justify-content-center">
            <a
              href="https://www.strava.com/athletes/381648"
              target="_blank"
              className={`${styles.fa_icon}`}
            >
              <FontAwesomeIcon icon={faStrava} />
            </a>
          </Col>
          <Col className="d-flex justify-content-center">
            <a
              href="https://www.instagram.com/tyler_stambaugh/"
              target="_blank"
              className={`${styles.fa_icon}`}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
          <Col className="d-flex justify-content-center">
            <a
              href="https://www.linkedin.com/in/tyler-stambaugh-b274a59/"
              target="_blank"
              className={`${styles.fa_icon}`}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>Copyright 2024 Tyler Stambaugh</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
