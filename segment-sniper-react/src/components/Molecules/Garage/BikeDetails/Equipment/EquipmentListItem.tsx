import { Button, Col, Row } from "react-bootstrap";
import { EquipmentModel } from "../../../../../graphql/generated";
import { useTimeFormatConverter } from "../../../../../hooks/useTimeFormatConverter";
import styles from "./Equipment.module.scss";
import { EquipmentModalState } from "./EquipmentList";
import { MAX_DATE_STRING } from "../../../../../Constants/timeConstant";
import { Dispatch, SetStateAction } from "react";

type EquipmentListItemProps = {
    item: EquipmentModel;
    setModalState: Dispatch<SetStateAction<EquipmentModalState>>;
}

const EquipmentListItem = ({ item, setModalState, }: EquipmentListItemProps) => {



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
                <Col className={styles.equipmentLabel}>Total Miles / Miles At Install</Col>
                <Col>{item.totalMiles} / {item.milesAtInstall}</Col>
            </Row>
            <Row>
                <Col className={styles.equipmentLabel}>Installed on</Col>
                <Col>{timeFormatter.convertStringToFormattedDateTime(item.installDate as string)}</Col>
            </Row>
            {item.retiredDate && item.retiredDate !== MAX_DATE_STRING && (
                <Row>
                    <Col className={styles.equipmentLabel}>Retired on</Col>
                    <Col>{timeFormatter.convertStringToFormattedDateTime(item.retiredDate as string)}</Col>
                </Row>
            )}
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
            <Row className="justify-content-center pb-2 pt-1">
                <Col>
                    <Button
                        className="d-flex justify-content-center px-3"
                        variant="primary"
                        onClick={() => {
                            setModalState({ type: "addEdit", item: item })
                        }}>

                        Edit
                    </Button>
                </Col>
                {
                    (item.retiredDate && item.retiredDate === MAX_DATE_STRING) ? (
                        <Col>
                            <Button
                                variant="secondary"
                                onClick={() => setModalState({ type: "retire", item: item })}>
                                Retire
                            </Button>
                        </Col>
                    ) : (
                        <Col>
                            <Button
                                variant="secondary"
                                onClick={() => setModalState({ type: "delete", item: item })}>
                                Delete
                            </Button>
                        </Col>
                    )
                }
            </Row >
        </Col >
    )
}

export default EquipmentListItem
