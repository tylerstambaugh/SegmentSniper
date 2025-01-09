import { Card } from "react-bootstrap";
import EquipmentList from "./Equipment/EquipmentList";
import { BikeModel } from "../../../../graphql/generated";
import _ from "lodash";
import { AddEquipmentFormValues } from "./Equipment/AddEquipmentForm";


type BikeDetailsCardProps = {
    bike: BikeModel;
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
}

const BikeDetailsCard = ({ bike, handleAddEquipmentSubmit }: BikeDetailsCardProps) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{bike?.name ?? "Bike Not Found"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bike?.brandName ?? "No data"} {bike?.modelName}</Card.Subtitle>
                <Card.Text>
                    {bike?.description}
                </Card.Text>
                <EquipmentList
                    equipment={_.compact(bike?.equipment) ?? []}
                    handleAddEquipmentSubmit={handleAddEquipmentSubmit} />
            </Card.Body>
        </Card>
    )
}

export default BikeDetailsCard