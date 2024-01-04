import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import logo from "../../assets/images/segment_sniper_pro_logo.svg";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { usePostSendPasswordResetEmail } from "../../hooks/Api/Auth/usePostSendPasswordResetEmail";
import useTokenDataStore from "../../stores/useTokenStore";
import { SendPasswordResetEmailRequest } from "../../services/Api/Auth/postSendPasswordResetEmail";

export default function ForgotPasswordWidget() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const sendPasswordResetEmail = usePostSendPasswordResetEmail();
  const [emailSent, setEmailSent] = useState(false);

  interface ForgotPasswordForm {
    emailAddress?: string | null;
  }

  const validationSchema = yup.object({
    emailAddress: yup
      .string()
      .required("Please enter an email address")
      .email("Please enter a valid email address"),
  });

  const formik = useFormik<ForgotPasswordForm>({
    initialValues: {
      emailAddress: null,
    },
    onSubmit: async (values: ForgotPasswordForm) => {
      setValidated(true);
      let request: SendPasswordResetEmailRequest = {
        emailAddress: values.emailAddress!,
      };
      await sendPasswordResetEmail.mutateAsync(request).then(() => {
        setEmailSent(true);
      });
    },
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  return (
    <>
      {emailSent ? (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={5} xs={10}>
            <div className="border "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 text-center">
                  <p>The password reset email has been sent.</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={5} xs={10}>
            <div className="border "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 text-center">
                  <p>
                    You know the drill, enter your email and we'll send you a
                    link you can use to reset your password.
                  </p>
                  <div className="mb-3">
                    <Form
                      name="resetPasswordForm"
                      onSubmit={(e) => {
                        setValidated(true);
                        formik.handleSubmit(e);
                      }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Email Address"
                          name="emailAddress"
                          isInvalid={!!formik.errors.emailAddress}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "emailAddress",
                              e.target.value
                            );
                            setEmailAddress(e.target.value);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.emailAddress}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid">
                        {sendPasswordResetEmail.isLoading ? (
                          <Button
                            type="submit"
                            variant="secondary"
                            className={"me-1"}
                          >
                            <Spinner
                              as="span"
                              variant="light"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              animation="border"
                            />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="primary"
                            className={"me-1 primary-rounded-button "}
                            disabled={sendPasswordResetEmail.isLoading}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
