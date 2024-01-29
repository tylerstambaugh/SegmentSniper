import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { usePostResetPassword } from "../../../../hooks/Api/Auth/usePostResetPassword";
import { ResetPasswordRequest } from "../../../../services/Api/Auth/postResetPassword";
import { AppRoutes } from "../../../../enums/AppRoutes";
import toast from "react-hot-toast";

export default function ResetPasswordWidget() {
  const resetPassword = usePostResetPassword();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [resetPasswordToken, setResetPasswordToken] = useState(
    searchParams.get("prt")
  );
  const [cleanedPasswordResetToken, setCleanedPasswordResetToken] =
    useState("");
  const [queryStringUserId, setQueryStringUserId] = useState(
    searchParams.get("uid")
  );
  interface ResetPasswordForm {
    password: string | null;
    confirmPassword: string | null;
  }

  const validationSchema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{7,99}$/,
        "Must contain at least 7 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setResetPasswordToken(searchParams.get("prt"));
    setCleanedPasswordResetToken(
      resetPasswordToken?.replace(/\s+/g, "+") ?? ""
    );
    setQueryStringUserId(searchParams.get("uid"));
  }, [location.search]);

  const formik = useFormik<ResetPasswordForm>({
    initialValues: {
      password: null,
      confirmPassword: null,
    },
    onSubmit: async (values: ResetPasswordForm) => {
      let passwordResetRequest: ResetPasswordRequest = {
        passwordResetToken: cleanedPasswordResetToken ?? "",
        userId: queryStringUserId ?? "",
        newPassword: values.password ?? "",
      };

      let response = await resetPassword.mutateAsync(passwordResetRequest);
      if (response.success) {
        setPasswordResetSuccess(true);
      } else {
        let error = resetPassword.error;
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unable to reset password. Please try again");
        }
      }
    },
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return resetPassword.error ? (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Card.Title className="d-flex justify-content-center">
              Reset Password
            </Card.Title>
            <Card.Body className="d-flex justify-content-center">
              <Row className="text-center">
                <Col>
                  <h4>An error occurred.</h4>
                </Col>
                <Row className="justify-content-center">
                  <Col>
                    <Button
                      className="w-100"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="w-100"
                      onClick={() => navigate(`/${AppRoutes.Home}`)}
                    >
                      Home
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : emailSent ? (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Card.Title className="d-flex justify-content-center">
              Reset Password
            </Card.Title>
            <Card.Body>
              <Row className="justify-text-center">
                <Col>
                  <h3>
                    Please check you email and follow the instructions to reset
                    your password.{" "}
                  </h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : passwordResetSuccess ? (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Card.Title className="d-flex justify-content-center">
              Reset Password
            </Card.Title>
            <Card.Body className="d-flex justify-content-center">
              <Row className="text-center">
                <div className="mb-3 text-center">
                  <h2>Password reset successfully. </h2>
                  <h3>
                    <Link to={`/${AppRoutes.Login}`}>
                      <Button className="px-4">Login</Button>
                    </Link>{" "}
                  </h3>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={4} xs={10}>
          <Card>
            <Card.Title className="d-flex justify-content-center">
              Reset Password
            </Card.Title>
            <Card.Body>
              <Form
                name="resetPasswordForm"
                onSubmit={(e) => {
                  setValidated(true);
                  formik.handleSubmit(e);
                }}
              >
                <Form.Group className="mb-3" controlId="formPassword">
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      isInvalid={!!formik.errors.password}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div
                        className="password-toggle-icon input-group-text"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={`bi bi-eye${showPassword ? "" : "-slash"}`}
                        />
                      </div>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <div className="input-group">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      isInvalid={!!formik.errors.confirmPassword}
                      onChange={(e) => {
                        formik.setFieldValue("confirmPassword", e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div
                        className="password-toggle-icon input-group-text"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <i
                          className={`bi bi-eye${
                            showConfirmPassword ? "" : "-slash"
                          }`}
                        />
                      </div>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
                <Row className="d-flex justify-content-around text-center">
                  <Col>
                    <div className="d-grid">
                      {resetPassword.isLoading ? (
                        <Button
                          type="submit"
                          variant="secondary"
                          className={"me-1 mx-4"}
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
                        <Button variant="primary" type="submit">
                          Reset
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
