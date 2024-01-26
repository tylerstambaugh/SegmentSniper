import { FormikErrors } from "formik";
import { Form } from "react-bootstrap";
import { ActivityListSearchForm } from "../../../Organisms/ActivityListLookupForm";

type Props = {
  activityName: string | null;
  onChange: (name: string) => void;
  errors: FormikErrors<ActivityListSearchForm>;
};

const ActivityNameSearchInput = ({ errors, onChange, activityName }: Props) => {
  return (
    <Form.Group className="mb-3" controlId="formNameSearch">
      <Form.Control
        type="text"
        placeholder="Name"
        value={activityName ?? ""}
        name="activityName"
        isInvalid={!!errors.activityName}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errors.activityName as FormikErrors<string>}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ActivityNameSearchInput;
