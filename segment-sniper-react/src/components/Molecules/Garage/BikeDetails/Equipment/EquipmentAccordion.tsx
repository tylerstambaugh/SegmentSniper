
import { Col, Accordion } from "react-bootstrap"
import EquipmentListItem from "./EquipmentListItem"
import { EquipmentModel } from "../../../../../graphql/generated"
import { Dispatch, SetStateAction } from "react";
import { EquipmentModalState } from "./EquipmentList";


type EquipmentAccordionProps = {
    equipment: EquipmentModel[];
    setModalState: Dispatch<SetStateAction<EquipmentModalState>>;
}

export const EquipmentAccordion = ({ equipment, setModalState }: EquipmentAccordionProps) => {


    return (
        <Col md={8} className="mb-2 mx-auto">
            <Accordion style={{ backgroundColor: '#f0f0f0' }}>
                {equipment && equipment.length > 0 ? (
                    equipment
                        .map((equipment, index) => (
                            <Accordion.Item eventKey={index.toString()} key={equipment.equipmentId}>
                                <Accordion.Header>
                                    {equipment.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <EquipmentListItem
                                        item={equipment}
                                        setModalState={setModalState} />
                                </Accordion.Body>
                            </Accordion.Item>
                        ))) : (
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            No equipment found
                        </Accordion.Header>
                    </Accordion.Item>)}
            </Accordion>
        </Col>
    )
}
