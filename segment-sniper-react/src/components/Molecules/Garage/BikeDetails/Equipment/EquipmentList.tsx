import { Button, Container, Row } from "react-bootstrap";
import { Equipment } from "../../../../../models/Garage/Equipment";
import EquipmentListItem from "./EquipmentListItem";
import AddEquipmentForm from "./AddEquipmentForm";
import { useState } from "react";


type EquipmentListProps = {
    equipment: Equipment[] | undefined;
}

const EquipmentList = ({ equipment }: EquipmentListProps) => {
    const [showAddEquipmentForm, setShowAddEquipmentForm] = useState<boolean>(false);


    const handleClosedAddEquipmentForm = () => {
        setShowAddEquipmentForm(false);
    }
    return (

        <Container>
            <AddEquipmentForm show={showAddEquipmentForm} onClose={handleClosedAddEquipmentForm} />
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