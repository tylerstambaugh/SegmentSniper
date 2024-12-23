import { Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";


export default function GarageMenu() {



    return (
        <Container className="pt-2">
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