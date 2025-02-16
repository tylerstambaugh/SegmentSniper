import { Button, Col, Row } from "react-bootstrap";
import { EquipmentModel } from "../../../../../graphql/generated";
import { useTimeFormatConverter } from "../../../../../hooks/useTimeFormatConverter";
import styles from "./Equipment.module.scss";

type EquipmentListItemProps = {
    item: EquipmentModel;
    setIsEditEquipment: (isEdit: boolean) => void;
}


const EquipmentListItem = ({ item, setIsEditEquipment }: EquipmentListItemProps) => {

    const timeFormatter = useTimeFormatConverter();
    return (
        <Col>
            <Row>
                <Col className={styles.equipmentLabel}>Name</Col>
                <Col>{item.name}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Description</Col>
                <Col>{item.description ?? "No description"}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Mileage</Col>
                <Col>{item.milesLogged}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Installed on</Col>
                <Col>{timeFormatter.convertStringToFormattedDateTime(item.installDate as string)}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Retired on</Col>
                <Col>{timeFormatter.convertStringToFormattedDateTime(item.retiredDate as string)}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Price </Col>
                <Col>${item.price}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Replace at </Col>
                <Col>{item.replaceAtMiles} miles</Col>
            </Row>
            {item.milesUntilReplaceReminder && item.milesUntilReplaceReminder > 0 && (
                <Row>
                    <Col className={styles.equipmentLabel}>Reminder </Col>
                    <Col>{item.milesUntilReplaceReminder} miles</Col>
                </Row>
            )}
            <Row className="justify-content-between">
                <Col>
                    <Button onClick={() => setIsEditEquipment(true)}>Edit</Button>
                </Col>
                <Col>
                    <Button className={styles.retire_button}>Retire</Button>
                </Col>
            </Row>
        </Col>
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