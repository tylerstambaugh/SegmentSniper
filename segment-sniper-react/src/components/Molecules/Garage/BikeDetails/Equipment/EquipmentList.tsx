import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import EquipmentListItem from "./EquipmentListItem";
import AddEquipmentForm, { AddEquipmentFormValues } from "./AddEquipmentForm";
import { useEffect, useState } from "react";
import { EquipmentModel } from "../../../../../graphql/generated";
import styles from "./Equipment.module.scss";
import { DateTime } from "luxon";


type EquipmentListProps = {
    equipment: EquipmentModel[] | [];
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
}

const EquipmentList = ({ equipment, handleAddEquipmentSubmit }: EquipmentListProps) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState<boolean>(false);
    const [editEquipmentId, setEditEquipmentId] = useState<string | null>();
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null);

    const handleClosedAddEquipmentForm = () => {
        setSelectedEquipment(null);
        setEditEquipmentId(null);
        setShowAddEquipmentForm(false);
    }

    function adaptEquipmentModelToEquipmentFormValues(selectedEquipment: EquipmentModel): AddEquipmentFormValues {
        return {
            name: selectedEquipment.name,
            description: selectedEquipment.description ?? "",
            milesLogged: selectedEquipment.milesLogged,
            installDate: selectedEquipment.installDate ? DateTime.fromISO(selectedEquipment.installDate) : null,
            retiredDate: selectedEquipment.retiredDate ? DateTime.fromISO(selectedEquipment.retiredDate) : null,
            price: selectedEquipment.price,
            replaceAtMiles: selectedEquipment.replaceAtMiles,
            milesUntilReplaceReminder: selectedEquipment.milesUntilReplaceReminder
        }
    }


    useEffect(() => {
        if (editEquipmentId) {
            setSelectedEquipment(equipment.find(equipment => equipment.equipmentId === editEquipmentId) ?? null);
        }
    }, [editEquipmentId])

    return (

        <Container>
            <AddEquipmentForm
                show={showAddEquipmentForm || selectedEquipment !== null}
                handleSubmit={handleAddEquipmentSubmit}
                onClose={handleClosedAddEquipmentForm}
                editEquipment={(editEquipmentId && selectedEquipment) ? adaptEquipmentModelToEquipmentFormValues(selectedEquipment) : undefined} />
            <p className={styles.equipmentHeading}>Equipment</p>
            <Row className='pt-3 p-1'>
                <Col md={8} className="mb-2 mx-auto">
                    <Accordion style={{ backgroundColor: '#f0f0f0' }}>
                        {equipment && equipment.length > 0 ? (
                            equipment.map((equipment, index) => (
                                <Accordion.Item eventKey={index.toString()} key={equipment.equipmentId}>
                                    <Accordion.Header>
                                        {equipment.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <EquipmentListItem item={equipment} setEditEquipmentId={setEditEquipmentId} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))) : (
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    No equipment found
                                </Accordion.Header>
                            </Accordion.Item>)}
                    </Accordion>
                </Col>
            </Row>
            <Button onClick={() => setShowAddEquipmentForm(true)}>Add Equipment</Button>
        </Container>
    )
}

export default EquipmentList