import { Col, Row } from "react-bootstrap";
import { Equipment } from "../../../../../models/Garage/Equipment";

type EquipmentListItemProps = {
    item: Equipment;
}


const EquipmentListItem = ({ item }: EquipmentListItemProps) => {

    return (
        <Row>
            <Col>
                {item.name}
            </Col>
            <Col>
                {item.description}
            </Col>
            <Col>
                {item.milesLogged}
            </Col>
            <Col>
                {item.installDate.toISOString()}
            </Col>
            <Col>
                {item.retiredDate.toISOString()}
            </Col>
            <Col>
                {item.price}
            </Col>

        </Row>
    )
}

export default EquipmentListItem

// export type Equipment = {
//     id: string;
//     bikeId: string;
//     userId: string;
//     name: string;
//     description?: string;
//     milesLogged: number;
//     installDate: Date;
//     retiredDate: Date;
//     price: number;
//     replaceAtMiles: number;
//     milesUntilReplaceReminder: number;
// };