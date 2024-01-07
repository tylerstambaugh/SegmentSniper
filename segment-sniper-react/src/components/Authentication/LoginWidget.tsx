import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { LoginRequest } from "../../services/Api/Auth/postLogin";
import toast from "react-hot-toast";
import { usePostLogin } from "../../hooks/Api/Auth/usePostLogin";
import logo from "../../assets/images/segment_sniper_pro_logo.svg";

import useTokenDataStore from "../../stores/useTokenStore";
import useUserStore from "../../stores/useUserStore";

export default function LoginWidget() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated] = useTokenDataStore((state) => [
    state.isAuthenticated,
  ]);
  const user = useUserStore((state) => state.user);
  const loginUser = usePostLogin();
  const navigate = useNavigate();
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
    onSubmit: async () => {
      await handleLoginUser();
    },
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  async function handleLoginUser() {
    let loginRequest: LoginRequest = {
      userName: emailAddress ?? "",
      password: password ?? "",
    };

    await loginUser.mutateAsync(loginRequest);

    if (isAuthenticated) {
      navigate(`/${AppRoutes.Dashboard}`);
    }
  }

  useEffect(() => {
    if (loginUser.error !== null) {
      toast.error(`login error: ${loginUser.error}`, {
        position: "bottom-center",
      });
    }
  }, [loginUser.error]);

  useEffect(() => {
    if (isAuthenticated && user?.id !== null) {
      navigate(`/${AppRoutes.Dashboard}`);
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated || user?.id === null ? (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={3} xs={10}>
            <div className="border "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 text-center">
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
                        placeholder="Email Address"
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
                    <Row className="d-flex justify-content-center">
                      <Col xs={12} md={12} lg={8} xl={8}>
                        <div className="d-grid">
                          {loginUser.isLoading ? (
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
                              disabled={loginUser.isLoading}
                            >
                              Login
                            </Button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  <Row className="d-flex justify-content-around mt-2">
                    <Col xs={12} md={8} lg={10} xl={8} className="py-3">
                      <Link
                        to={`/${AppRoutes.ForgotPassword}`}
                        className="text-primary fw-bold"
                      >
                        Forgot Password
                      </Link>
                    </Col>
                    <Col xs={12} md={8} lg={10} xl={8}>
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link
                          to={`/${AppRoutes.Register}`}
                          className="text-primary fw-bold"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <h3>
            You are already logged in. Click{" "}
            <Link to={AppRoutes.Dashboard}>
              <Button className={"p-1 mb-2"}>here</Button>
            </Link>{" "}
            to return to the dashboard.
          </h3>
        </>
      )}
    </>
  );
}
