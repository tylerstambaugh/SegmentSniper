import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import EquipmentListItem from "./EquipmentListItem";
import AddEquipmentForm, { AddEquipmentFormValues } from "./AddEquipmentForm";
import { useState } from "react";
import { EquipmentModel } from "../../../../../graphql/generated";
import styles from "./Equipment.module.scss";
import { useTimeFormatConverter } from "../../../../../hooks/useTimeFormatConverter";


type EquipmentListProps = {
    equipment: EquipmentModel[] | [];
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
}

const EquipmentList = ({ equipment, handleAddEquipmentSubmit }: EquipmentListProps) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState<boolean>(false);
    const timeFormatter = useTimeFormatConverter();

    const handleClosedAddEquipmentForm = () => {
        setShowAddEquipmentForm(false);
    }
    return (

        <Container>
            <AddEquipmentForm show={showAddEquipmentForm} handleSubmit={handleAddEquipmentSubmit} onClose={handleClosedAddEquipmentForm} />
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
                                        <EquipmentListItem item={equipment} />
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
            {/* {equipment && equipment.length > 0 ? (
                equipment.map((equipment) => (
                    <div key={equipment.equipmentId}>
                        <Row>
                            <EquipmentListItem item={equipment} />
                        </Row>
                    </div>
                ))

            ) : (
                <p>No equipment found</p>
            )} */}
            <Button onClick={() => setShowAddEquipmentForm(true)}>Add Equipment</Button>
        </Container>
    )
}

export default EquipmentList