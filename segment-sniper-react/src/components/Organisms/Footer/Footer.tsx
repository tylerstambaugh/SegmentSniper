import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h5>Copyright 2023 Tyler Stambaugh</h5>
          </Col>
          <Col xs={12} md={4}>
            <h5>Contact Us</h5>

            <p>Email: segmentsniper@gmail.com</p>
          </Col>
          <Col xs={12} md={4}>
            <h5>Find Us</h5>
            <a href="https://github.com/tylerstambaugh">GitHub</a>
            <a href="https://www.strava.com/athletes/381648">Strava</a>
            <a href="https://www.strava.com/athletes/381648">Instagram</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
