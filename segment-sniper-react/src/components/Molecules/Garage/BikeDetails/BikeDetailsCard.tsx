import { Card, Col, Row } from "react-bootstrap";
import EquipmentList from "./Equipment/EquipmentList";
import { BikeModel } from "../../../../graphql/generated";
import _ from "lodash";
import { AddEquipmentFormValues } from "./Equipment/AddEquipmentForm";
import { useConversionHelpers } from "../../../../hooks/useConversionHelpers";


type BikeDetailsCardProps = {
    bike: BikeModel;
    handleAddEquipmentSubmit: (values: AddEquipmentFormValues) => void;
    handleRetireEquipment: (equipmentId: string) => void;
}

const BikeDetailsCard = ({ bike, handleAddEquipmentSubmit, handleRetireEquipment }: BikeDetailsCardProps) => {
    const convert = useConversionHelpers();
    return (
        <Card>
            <Card.Body>
                <Card.Title>{bike?.name ?? "Bike Not Found"}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bike?.brandName ?? "No data"} {bike?.modelName} - {convert.ConvertMetersToMiles(bike?.metersLogged ?? 0)} miles</Card.Subtitle>
                <Card.Text>
                    <Row>
                        {bike?.description}
                    </Row>
                </Card.Text>
                <EquipmentList
                    equipment={_.compact(bike?.equipment) ?? []}
                    handleAddEquipmentSubmit={handleAddEquipmentSubmit}
                    handleRetireEquipment={handleRetireEquipment} />
            </Card.Body>
        </Card>
    )
}

export default BikeDetailsCard