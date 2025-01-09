import { Card } from "react-bootstrap";
import EquipmentList from "./Equipment/EquipmentList";
import { BikeModel } from "../../../../graphql/generated";
import _ from "lodash";


type BikeDetailsCardProps = {
    bike: BikeModel;
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
                <EquipmentList equipment={_.compact(bike?.equipment) ?? []} />
            </Card.Body>
        </Card>
    )
}

export default BikeDetailsCard