import { Col, Row } from "react-bootstrap";
import { EquipmentModel } from "../../../../../graphql/generated";
import { useTimeFormatConverter } from "../../../../../hooks/useTimeFormatConverter";
import styles from "./Equipment.module.scss";

type EquipmentListItemProps = {
    item: EquipmentModel;
}


const EquipmentListItem = ({ item }: EquipmentListItemProps) => {

    const timeFormatter = useTimeFormatConverter();
    return (
        <Row>
            <Col>
                <Row>

                    <Col>
                        <Row className={styles.equipmentLabel}>
                            Name
                        </Row>
                        <Row>

                            {item.name}
                        </Row>
                    </Col>
                    <Col>
                        {item.description ?? "No description"}
                    </Col>
                    <Col>
                        {item.milesLogged}
                    </Col>
                </Row>
                <Row>

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