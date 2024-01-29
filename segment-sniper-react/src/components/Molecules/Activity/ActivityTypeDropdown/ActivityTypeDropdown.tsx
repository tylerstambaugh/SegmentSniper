import { FormikErrors } from "formik";
import { ActivityListSearchForm } from "../../../Organisms/ActivityListLookupForm/ActivityListLookupForm";
import { Col, Form, Row } from "react-bootstrap";
import { ActivityTypes } from "../../../../enums/ActivityTypes";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styles from "./ActivityTypeDropdown.module.scss";

type Props = {
  selection: string;
  onChange: (selection: string) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

const ActivityTypeDropdown = ({ selection, onChange, errors }: Props) => {
  const animatedComponents = makeAnimated();
  return (
    <Form.Group
      controlId="activityTypeFormGroup"
      className={styles.activityTypeFormGroup}
    >
      <Row className={`mb-3 d-flex`}>
        <Col md={6} className={`mb-2`}>
          <Form.Label
            id="activityTypeDropdownLabel"
            className={styles.activityTypeLabel}
          >
            Activity Type:
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
            options={Object.entries(ActivityTypes).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </Col>
        <Form.Control.Feedback type="invalid">
          {errors.activityName as FormikErrors<string>}
        </Form.Control.Feedback>
      </Row>
    </Form.Group>
  );
};

export default ActivityTypeDropdown;
