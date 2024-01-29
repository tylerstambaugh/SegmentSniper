import { FormikErrors } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import { ActivityListSearchForm } from "../../../Organisms/ActivityListLookupForm";
import styles from "./ActivityNameSearchInput.module.scss";

type Props = {
  activityName: string | null;
  onChange: (name: string) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

const ActivityNameSearchInput = ({ errors, onChange, activityName }: Props) => {
  return (
    <Row className=" justify-content-center mb-3">
      <Col className="mb-2">
        <Form.Group controlId="formNameSearch">
          <Form.Label id="activityNameSearchLabel">Search by name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Activity Name"
            value={activityName ?? ""}
            name="activityName"
            isInvalid={!!errors.activityName}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className={`${styles.activityNameInput}`}
          />
          <Form.Control.Feedback type="invalid">
            {errors.activityName as FormikErrors<string>}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default ActivityNameSearchInput;
