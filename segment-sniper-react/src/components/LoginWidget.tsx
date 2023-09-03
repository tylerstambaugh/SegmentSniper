import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

export default function LoginWidget() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  interface LoginForm {
    emailAddress: string | null;
    password: string | null;
  }

  const validationSchema = yup.object({
    emailAddress: yup
      .string()
      .required("Please enter an email address")
      .email("Please enter a valid email address"),
    password: yup.string().required("Please enter a password"),
  });

  const formik = useFormik<LoginForm>({
    initialValues: {
      emailAddress: null,
      password: null,
    },
    onSubmit: () => {},
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  return (
    <>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={5} xs={10}>
          <div className="border "></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 ">
                <h2 className="fw-bold mb-2 ">Segment Sniper Pro</h2>
                <p className=" mb-3">
                  Please enter your email and password to login
                </p>
                <div className="mb-3">
                  <Form
                    name="loginForm"
                    onSubmit={(e) => {
                      setValidated(true);
                      formik.handleSubmit(e);
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name="emailAddress"
                        isInvalid={!!formik.errors.emailAddress}
                        onChange={(e) => {
                          formik.setFieldValue("emailAddress", e.target.value);
                          setEmailAddress(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.emailAddress}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        isInvalid={!!formik.errors.password}
                        onChange={(e) => {
                          formik.setFieldValue("password", e.target.value);
                          setPassword(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link
                        to={AppRoutes.Register}
                        className="text-primary fw-bold"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
