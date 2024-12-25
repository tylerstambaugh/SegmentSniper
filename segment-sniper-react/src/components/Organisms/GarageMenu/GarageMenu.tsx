import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";


export default function GarageMenu() {



    return (
        <Container className="pt-2">
            <Row>
                <Col>
                    <h2>Your Garage </h2>
                    <BikeList />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button>
                        Import Bikes
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Manually Add Bike
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

//ceramic speed is already doing it.