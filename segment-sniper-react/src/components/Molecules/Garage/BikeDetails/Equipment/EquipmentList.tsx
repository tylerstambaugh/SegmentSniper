import { Button, Container, Row } from "react-bootstrap";
import EquipmentListItem from "./EquipmentListItem";
import AddEquipmentForm, { AddEquipmentFormValues } from "./AddEquipmentForm";
import { useState } from "react";
import { EquipmentModel } from "../../../../../graphql/generated";


type EquipmentListProps = {
    equipment: EquipmentModel[] | [];
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
}

const EquipmentList = ({ equipment, handleAddEquipmentSubmit }: EquipmentListProps) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState<boolean>(false);



    const handleClosedAddEquipmentForm = () => {
        setShowAddEquipmentForm(false);
    }
    return (

        <Container>
            <AddEquipmentForm show={showAddEquipmentForm} handleSubmit={handleAddEquipmentSubmit} onClose={handleClosedAddEquipmentForm} />
            {equipment && equipment.length > 0 ? (
                equipment.map((equipment) => (
                    <div key={equipment.id}>
                        <Row>
                            <EquipmentListItem item={equipment} />
                        </Row>
                    </div>
                ))

            ) : (
                <p>No equipment found</p>
            )}
            <Button onClick={() => setShowAddEquipmentForm(true)}>Add Equipment</Button>
        </Container>
    )
}

export default EquipmentList