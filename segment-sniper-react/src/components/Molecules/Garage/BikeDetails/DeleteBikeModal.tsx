

import { Button, Col, Modal, Row } from "react-bootstrap";

import { Maybe } from "graphql/jsutils/Maybe";
import { BikeModel } from "../../../../graphql/generated";


export interface DeleteBikeBase {
    bikeId: Maybe<string>;
}

export interface DeleteBikeValues extends DeleteBikeBase {
    bikeId: string;
    userId: string;
}

export type DeleteBikeModalProps = {
    show: boolean;
    bike: Maybe<BikeModel>
    onClose: () => void;
    handleDeleteBike: (values: BikeModel) => Promise<void>;
};

const DeleteBikeModal = ({
    show,
    bike,
    onClose,
    handleDeleteBike,
}: DeleteBikeModalProps) => {
    const handleDelete = () => {
        if (bike) {
            handleDeleteBike(bike);
        }
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>{`Delete ${bike?.name}?`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-3">
                        Are you sure you want to delete this bike? This action cannot be undone.
                    </Row>
                    <Row className="mb-3">
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Row>
                </Col>
            </Modal.Body>
        </Modal>
    );
}

export default DeleteBikeModal;