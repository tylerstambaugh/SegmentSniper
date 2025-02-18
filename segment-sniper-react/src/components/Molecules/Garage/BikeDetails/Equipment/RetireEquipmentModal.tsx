import { Button, Col, Modal, Row } from "react-bootstrap"
import { EquipmentModel } from "../../../../../graphql/generated"
import { Maybe } from "graphql/jsutils/Maybe"
import { DateTime } from "luxon"

type RetireEquipmentModalProps = {
    show: boolean
    item: Maybe<EquipmentModel>
    onClose: () => void
    handleRetireEquipment: (equipmentId: string) => void
}

const RetireEquipmentModal = ({ show, item, onClose, handleRetireEquipment }: RetireEquipmentModalProps) => {


    return (
        <Modal show={show} onHide={onClose} className="shadow">
            <Modal.Header closeButton>
                <Modal.Title>Retire Equipment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row>
                        {`Are you sure you want to retire this equipment on ${DateTime.now().toLocaleString(DateTime.DATE_MED)}`}
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => onClose}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => handleRetireEquipment(item?.equipmentId ?? "")}>Retire</Button>
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>'
        </Modal>
    )
}

export default RetireEquipmentModal