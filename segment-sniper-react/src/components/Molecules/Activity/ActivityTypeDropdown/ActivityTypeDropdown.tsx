import { FormikErrors } from "formik";
import { ActivityListSearchForm } from "../../../Organisms/ActivityListLookupForm";
import { Col, Form, Row } from "react-bootstrap";
import { ActivityTypes } from "../../../../enums/ActivityTypes";

type Props = {
  selection: string;
  onChange: (selection: string) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

const ActivityTypeDropdown = ({ selection, onChange, errors }: Props) => {
  return (
    <Col>
      <Row className=" justify-content-center mb-3">
        <Col>
          <Form.Group controlId="activityTypeFormGroup">
            <Form.Label id="activityTypeDropdownLabel">
              Activity Type:
            </Form.Label>
            <Form.Select
              value={selection}
              onChange={(e) => {
                onChange(e.currentTarget.value);
              }}
              isInvalid={!!errors.activityType}
            >
              {Object.entries(ActivityTypes).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.activityName as FormikErrors<string>}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Col>
  );
};

export default ActivityTypeDropdown;
