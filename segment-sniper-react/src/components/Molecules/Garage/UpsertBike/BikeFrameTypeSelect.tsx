import { FormikErrors } from "formik";

import { Col, Form, Row } from "react-bootstrap";
import styles from "./UpsertBike.module.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { UpsertBikeFormValues } from "./UpsertBikeModal";
import { FrameType, FrameTypeToString } from "../../../../enums/FrameTypes";

type Props = {
    selection: string;
    onChange: (selection: string) => void;
    errors: FormikErrors<UpsertBikeFormValues>;
};

const ActivityTypeDropdown = ({ selection, onChange, errors }: Props) => {
    const animatedComponents = makeAnimated();
    return (
        <Form.Group
            controlId="bikeFrameTypeFormGroup"
            className={styles.bikeFrameTypeFormGroup}
        >
            <Row className={`mb-3 d-flex`}>
                <Col md={6} className={`mb-2`}>
                    <Form.Label
                        id="bikeFrameDropdownLabel"
                        className={styles.bikeFrameLabel}
                    >
                        Bike Type:
                    </Form.Label>
                </Col>
                <Col>
                    <Select
                        closeMenuOnSelect={true}
                        className={styles.select}
                        isMulti={false}
                        components={animatedComponents}
                        value={{ value: selection, label: selection }}
                        onChange={(selection) => {
                            onChange(selection?.value ?? "Ride");
                        }}
                        options={Object.values(FrameType)
                            .filter((v) => typeof v === 'number')
                            .map((value) => ({
                                value: value as unknown as string,
                                label: FrameTypeToString(value as FrameType),
                            }))}
                    />
                </Col>
                <Form.Control.Feedback type="invalid">
                    {errors.bikeFrameType as FormikErrors<string>}
                </Form.Control.Feedback>
            </Row>
        </Form.Group>
    );
};

export default ActivityTypeDropdown;
