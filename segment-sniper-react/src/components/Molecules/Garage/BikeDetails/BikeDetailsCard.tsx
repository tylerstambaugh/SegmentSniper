import { Card } from "react-bootstrap";
import { Bike } from "../../../../models/Garage/Bike";


type BikeDetailsCardProps = {
    bike: Bike | undefined;
}

const BikeDetailsCard = ({ bike }: BikeDetailsCardProps) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{bike?.name ?? "undefined"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bike?.brandName ?? "No data"} {bike?.modelName}</Card.Subtitle>
                <Card.Text>
                    {bike?.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BikeDetailsCard