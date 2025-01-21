import { Col, Row } from "react-bootstrap";
import { EquipmentModel } from "../../../../../graphql/generated";
import { useTimeFormatConverter } from "../../../../../hooks/useTimeFormatConverter";

type EquipmentListItemProps = {
    item: EquipmentModel;
}


const EquipmentListItem = ({ item }: EquipmentListItemProps) => {

    const timeFormatter = useTimeFormatConverter();
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
                {timeFormatter.convertStringToFormattedDateTime(item.installDate as string)}
            </Col>
            <Col>
                {timeFormatter.convertStringToFormattedDateTime(item.retiredDate as string)}
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