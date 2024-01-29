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
    <Col>
      <Row className={`justify-content-center mb-3 ${styles.activityTypeRow}`}>
        <Form.Group
          controlId="activityTypeFormGroup"
          className={styles.activityTypeFormGroup}
        >
          <Col
            sm={12}
            className={`mb-2 mb-md-0 ${styles.activityTypeLabelColumn}`}
          >
            <Form.Label
              id="activityTypeDropdownLabel"
              className={styles.activityTypeLabel}
            >
              Activity Type:
            </Form.Label>
          </Col>
          <Col sm={12}>
            <Select
              closeMenuOnSelect={true}
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
        </Form.Group>
      </Row>
    </Col>
  );
};

export default ActivityTypeDropdown;
