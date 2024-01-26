import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { Form } from "react-bootstrap";
import { useState } from "react";

type Props = {
  errors: FormikErrors<{
    activityName: string;
  }>;
};
interface ActivityNameSearchInputForm {
  activityName: string | null;
}

const ActivityNameSearchInput = ({ errors }: Props) => {
  const [validated, setValidated] = useState(false);

  const validationSchema = yup.object({
    activityName: yup
      .string()
      .required("Please enter an email address")
      .email("Please enter a valid email address"),
  });

  const formik = useFormik<ActivityNameSearchInputForm>({
    initialValues: {
      activityName: null,
    },
    onSubmit: async () => {},
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control
        type="text"
        placeholder="Name"
        name="activityName"
        isInvalid={!!formik.errors.activityName}
        onChange={(e) => {
          formik.setFieldValue("activityName", e.target.value);
        }}
        onBlur={formik.handleBlur}
      />
      <Form.Control.Feedback type="invalid">
        {errors.activityName as FormikErrors<string>}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ActivityNameSearchInput;
