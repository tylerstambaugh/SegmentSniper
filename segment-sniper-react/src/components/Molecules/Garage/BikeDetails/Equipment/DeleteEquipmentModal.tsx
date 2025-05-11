import { Button, Col, Modal, Row } from "react-bootstrap";
import { EquipmentModel } from "../../../../../graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";


export interface DeleteBikeEquipmentBase {
    equipmentId: Maybe<string>;
}

export interface DeleteBikeEquipmentValues extends DeleteBikeEquipmentBase {
    bikeId: string;
    userId: string;
}

export type DeleteEquipmentModalProps = {
    show: boolean;
    item: Maybe<EquipmentModel>
    onClose: () => void;
    handleDeleteEquipment: (values: EquipmentModel) => Promise<void>;
};

const DeleteEquipmentModal = ({
    show,
    item,
    onClose,
    handleDeleteEquipment,
}: DeleteEquipmentModalProps) => {
    const handleDelete = () => {
        if (item) {
            handleDeleteEquipment(item);
        }
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Delete Equipment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-3">
                        Are you sure you want to delete this equipment? This action cannot be undone.
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

export default DeleteEquipmentModal;