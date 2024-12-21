import { Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";


export default function GarageMenu() {



    return (
        <Container>
            <Row>
                <Col>
                    <p> This is going to be the gear wear log entry. </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Your Bikes</h2>
                    <BikeList />
                </Col>
            </Row>
        </Container>
    )
}

//ceramic speed is already doing it.