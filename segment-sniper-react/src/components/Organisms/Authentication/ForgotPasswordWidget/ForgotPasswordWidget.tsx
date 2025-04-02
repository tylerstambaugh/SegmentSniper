import { Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { usePostSendPasswordResetEmail } from "../../../../hooks/Api/Auth/usePostSendPasswordResetEmail";
import { SendPasswordResetEmailRequest } from "../../../../services/Api/Auth/postSendPasswordResetEmail";
import { CustomToast } from "../../../Molecules/Toast/CustomToast";

export default function ForgotPasswordWidget() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
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
      const request: SendPasswordResetEmailRequest = {
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

  useEffect(() => {
    if (sendPasswordResetEmail.error instanceof Error) {
      CustomToast({
        message: "Error resetting password",
        error: `Error: ${sendPasswordResetEmail.error.message}`,
        type: "error",
      });
    }
  }, [sendPasswordResetEmail.error]);

  return (
    <>
      {sendPasswordResetEmail.error ? (
        <>
          <Row className="vh-100 d-flex justify-content-center mt-5">
            <Col md={6} lg={3} xs={10}>
              <Card className="shadow">
                <Card.Body>
                  <Row>
                    <Col className="mb-3 text-center">
                      <p>
                        Something wasn't right. Check your info and try again.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-3 text-center">
                      <Button
                        className="w-100"
                        onClick={() => window.location.reload()}
                      >
                        Try Again
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : emailSent ? (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={3} xs={10}>
            <Card className="shadow">
              <Card.Body>
                <Row>
                  <Col className="mb-3 text-center">
                    <p>The password reset email has been sent.</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-3 text-center">
                    <Button onClick={() => navigate(`/${AppRoutes.Home}`)}>
                      Home
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={3} xs={10}>
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
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.emailAddress}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid">
                        {sendPasswordResetEmail.isPending ? (
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
                            disabled={sendPasswordResetEmail.isPending}
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
