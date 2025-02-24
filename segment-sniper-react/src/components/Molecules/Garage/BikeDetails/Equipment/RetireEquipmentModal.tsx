import { Button, Col, Modal, Row } from "react-bootstrap"
import { EquipmentModel } from "../../../../../graphql/generated"
import { Maybe } from "graphql/jsutils/Maybe"
import { DateTime } from "luxon"
import { RetireBikeEquipmentValues } from "../../../../../pages/Garage/BikeDetails"

type RetireEquipmentModalProps = {
    show: boolean
    item: Maybe<EquipmentModel>
    onClose: () => void
    handleRetireEquipment: (values: RetireBikeEquipmentValues) => void
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
                            <Button onClick={() => handleRetireEquipment({ equipmentId: item?.equipmentId ?? "" })}>Retire</Button>
                        </Col>
                    </Row>
                </Col>
            </Modal.Body>'
        </Modal>
    )
}

export default RetireEquipmentModal