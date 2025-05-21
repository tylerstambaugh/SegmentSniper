import { useState } from "react";
import { BikeModel } from "../../../../graphql/generated";
import { Col, Form, Modal, Row } from "react-bootstrap";


export type UpsertBikeModalProps = {
    show: boolean;
    onClose: () => void;
    loading?: boolean;
    handleUpsertBike: (values: BikeModel) => void;
    bike?: BikeModel;
}


export interface UpsertBikeFormValues {
    // bikeId: string;
    // userId: string;
    bikeName: string;
    bikeType: string;
    bikeBrand: string;
    bikeModel: string;
    bikeYear: number;
    bikeWeight: number;
    bikeSize: string;
    bikeColor: string;
    bikeNotes: string;
}

const UpsertBikeModal = ({
    show, }: UpsertBikeModalProps) => {
    const [validated, setValidated] = useState(false);

    return (
        <Modal show={show} onHide={() => { }} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Add Bike</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-3">
                        <Form.Group controlId="bikeName">
                            <Form.Label>Bike Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter bike name" />
                        </Form.Group>
                    </Row>
                    {/* Add more form fields as needed */}
                </Col>
            </Modal.Body>
        </Modal>
    )
}

export default UpsertBikeModal;