import { Button, Col, Container, Row } from "react-bootstrap";
import { BikeList } from "../../Molecules/Garage/BikeList/BikeList";
import { useState } from "react";
import ImportBikesModal from "../../Molecules/Garage/ImportBikes/ImportBikesModal";
import UpsertBikeModal from "../../Molecules/Garage/AddBike/UpsertBikeModal";



type GarageModalState =
    | { type: "none" }
    | { type: "import" }
    | { type: "addBike" };
export default function GarageMenu() {

    const [modalState, setModalState] = useState<GarageModalState>({ type: "none" });
    const handleClosedModal = () => {
        setModalState({ type: "none" });
    }

    const handleUpsertBike = () => {
        console.log("Add bike clicked");

    }


    return (
        <>
            <ImportBikesModal show={modalState.type === "import"} onClose={handleClosedModal} />
            <UpsertBikeModal show={modalState.type === "addBike"} onClose={handleClosedModal} handleUpsertBike={handleUpsertBike} />
            <Container className="pt-2">
                <Row>
                    <Col>
                        <h2>Your Garage </h2>
                        <BikeList />
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button onClick={() => {
                            console.log("Import bikes clicked");
                        }}>
                            Import Bikes
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button>
                            Manually Add Bike
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
