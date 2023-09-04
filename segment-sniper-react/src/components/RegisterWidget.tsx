import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function RegisterWidget() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();

  interface RegisterForm {
    firstName: string | null;
    emailAddress: string | null;
    password: string | null;
    confirmPassword: string | null;
  }

  const validationSchema = yup.object({});

  const formik = useFormik<RegisterForm>({
    initialValues: {
      emailAddress: null,
      password: null,
      confirmPassword: null,
      firstName: null,
    },
    onSubmit: () => {},
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>Register New User</Card.Title>
            <Card.Body>
              <p>Fill out the form to register a new user:</p>
              <Form
                name="registerForm"
                onSubmit={(e) => {
                  setValidated(true);
                  formik.handleSubmit(e);
                }}
              >
                <Form.Group controlId="formEmailAddress">
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    name="emailAddress"
                    isInvalid={!!formik.errors.emailAddress}
                    onChange={(e) => {
                      formik.setFieldValue("emailAddress", e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.emailAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
