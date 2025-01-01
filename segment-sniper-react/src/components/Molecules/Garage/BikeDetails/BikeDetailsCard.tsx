import { Card } from "react-bootstrap";
import { Bike } from "../../../../models/Garage/Bike";
import EquipmentList from "./Equipment/EquipmentList";


type BikeDetailsCardProps = {
    bike: Bike | undefined;
}

const BikeDetailsCard = ({ bike }: BikeDetailsCardProps) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{bike?.name ?? "Bike Not Found"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bike?.brandName ?? "No data"} {bike?.modelName}</Card.Subtitle>
                <Card.Text>
                    {bike?.description}
                </Card.Text>
                <EquipmentList equipment={bike?.equipment} />
            </Card.Body>
        </Card>
    )
}

export default BikeDetailsCard