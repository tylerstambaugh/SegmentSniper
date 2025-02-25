import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import EquipmentListItem from "./EquipmentListItem";
import AddEquipmentForm, { AddEquipmentFormValues } from "./AddEquipmentForm";
import { useEffect, useState } from "react";
import { EquipmentModel } from "../../../../../graphql/generated";
import styles from "./Equipment.module.scss";
import { DateTime } from "luxon";
import { MAX_DATE_TIME } from "../../../../../Constants/timeConstant";
import RetireEquipmentModal from "./RetireEquipmentModal";
import { RetireBikeEquipmentBase } from "../../../../../pages/Garage/BikeDetails";


type EquipmentListProps = {
    equipment: EquipmentModel[] | [];
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
    handleRetireEquipment: (values: RetireBikeEquipmentBase) => void;
}

export type EquipmentModalState =
    | { type: "none" }
    | { type: "retire", item: EquipmentModel }
    | { type: "addEdit", item: EquipmentModel };



const EquipmentList = ({ equipment, handleAddEquipmentSubmit, handleRetireEquipment }: EquipmentListProps) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState<boolean>(false);
    const [editEquipmentId, setEditEquipmentId] = useState<string | null>();
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentModel | null>(null);

    const [modalState, setModalState] = useState<EquipmentModalState>({ type: "none" });

    const handleClosedModal = () => {
        setModalState({ type: "none" });
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


    // useEffect(() => {
    //     if (editEquipmentId) {
    //         setSelectedEquipment(equipment.find(equipment => equipment.equipmentId === editEquipmentId) ?? null);
    //     }
    // }, [editEquipmentId])

    return (

        <Container>
            <Col>
                <Row>

                    <AddEquipmentForm
                        show={modalState.type === "addEdit"}
                        handleSubmit={handleAddEquipmentSubmit}
                        onClose={handleClosedModal}
                        editEquipment={modalState.type === "addEdit" ? adaptEquipmentModelToEquipmentFormValues(modalState.item!) : undefined}
                    />
                    <RetireEquipmentModal
                        show={modalState.type === "retire"}
                        onClose={handleClosedModal}
                        item={modalState.type === "retire" ? modalState.item : null}
                        handleRetireEquipment={handleRetireEquipment}
                    />
                    <p className={styles.equipmentHeading}>Equipment</p>
                    <Row className='pt-3 p-1'>
                        <Col md={8} className="mb-2 mx-auto">
                            <Accordion style={{ backgroundColor: '#f0f0f0' }}>
                                {equipment && equipment.length > 0 ? (
                                    equipment.filter(e => DateTime.fromISO(e.retiredDate!) === MAX_DATE_TIME)
                                        .map((equipment, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={equipment.equipmentId}>
                                                <Accordion.Header>
                                                    {equipment.name}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <EquipmentListItem
                                                        item={equipment}
                                                        setModalState={setModalState}
                                                        handleRetireEquipment={handleRetireEquipment} />
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
                </Row>
                <Row>
                    <p className={styles.equipmentHeading}>Retired Equipment</p>
                    <Row className='pt-3 p-1'>
                        <Col md={8} className="mb-2 mx-auto">
                            <Accordion style={{ backgroundColor: '#f0f0f0' }}>
                                {equipment && equipment.length > 0 ? (
                                    equipment.filter(e => DateTime.fromISO(e.retiredDate!) !== MAX_DATE_TIME)
                                        .map((equipment, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={equipment.equipmentId}>
                                                <Accordion.Header>
                                                    {equipment.name}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <EquipmentListItem
                                                        item={equipment}
                                                        setModalState={setModalState} />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))) : (
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            No retired equipment
                                        </Accordion.Header>
                                    </Accordion.Item>)}
                            </Accordion>
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Container>
    )
}

export default EquipmentList