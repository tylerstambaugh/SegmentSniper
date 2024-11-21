import { Card, Col, Row } from 'react-bootstrap';
import styles from './about.module.scss';

function AboutGarage() {
    return (
        <>
            <Col>
                <Card>
                    <Card.Body>
                        <Row className='flex-row justify-content-between'>
                            <Col>
                                <h4>Welcome to your garage... Under Construction</h4>
                                <p>This is where we'll track the miles you log on your bikes.  We'll allow you to specify the components of each bicycles, as detailed as you would like.
                                    Then, we'll allow you to setup maintenance reminders based on either time or mileage so that you can replace parts before they're too worn and track
                                    how many miles you're getting out of each component..</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default AboutGarage;
