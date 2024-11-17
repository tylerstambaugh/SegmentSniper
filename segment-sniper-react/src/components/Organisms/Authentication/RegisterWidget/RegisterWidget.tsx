import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { usePostRegisterUser } from "../../../../hooks/Api/Auth/usePostRegisterUser";
import { useNavigate } from "react-router-dom";
import useTokenDataStore from "../../../../stores/useTokenStore";
import { RegisterUserRequest } from "../../../../services/Api/Auth/postRegisterUser";
import { LoginRequest } from "../../../../services/Api/Auth/postLogin";
import { usePostLogin } from "../../../../hooks/Api/Auth/usePostLogin";
import { AppRoutes } from "../../../../enums/AppRoutes";
import { CustomToast } from "../../../Molecules/Toast/CustomToast";

export default function RegisterWidget() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const registerUser = usePostRegisterUser();
  const loginUser = usePostLogin();
  const [tokenData, isAuthenticated] = useTokenDataStore((state) => [state.tokenData, state.isAuthenticated]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);


  //TODO Remove this after testing
  // const [emailAddress, setEmailAddress] = useState<string>();
  // const [password, setPassword] = useState<string>();
  // const [confirmPassword, setConfirmPassword] = useState<string>();
  // const [firstName, setFirstName] = useState<string>();

  interface RegisterForm {
    firstName: string | null;
    emailAddress: string | null;
    password: string | null;
    confirmPassword: string | null;
  }

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .typeError("First name may only contain letters")
      .max(15, "First name must be 15 characters or less"),
    emailAddress: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
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

  const formik = useFormik<RegisterForm>({
    initialValues: {
      firstName: null,
      emailAddress: null,
      password: null,
      confirmPassword: null,
    },
    onSubmit: async (values: RegisterForm) => {
      await handleRegisterUser(values);
      //TODO Remove this after testing
      // if (!registerUser.isError) {
      //   await handleLoginUser();
      // }
    },
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  async function handleRegisterUser(values: RegisterForm) {
    const registerUserRequest: RegisterUserRequest = {
      firstName: values.firstName ?? "",
      email: values.emailAddress ?? "",
      password: values.password ?? "",
    };
    try {
      await registerUser.mutateAsync(registerUserRequest).then(() => {
        const loginRequest: LoginRequest = {
          userName: values.emailAddress ?? "",
          password: values.password ?? "",
        };
        console.log("register finished, logging in...");

        loginUser.mutateAsync(loginRequest).then(() => {
          console.log("login called");

          console.log("login error, accesstoken, isAuthenticaed:", loginUser.error, tokenData?.accessToken, isAuthenticated);
          if (!loginUser.error && tokenData?.accessToken !== null && isAuthenticated) {
            navigate(`/${AppRoutes.Dashboard}`);
          }
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: "Error registering/logging in user",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }
  }

  //TODO Remove this after testing
  // async function handleLoginUser() {
  //   if (!registerUser.isError && !registerUser.isLoading) {
  //     const loginRequest: LoginRequest = {
  //       userName: emailAddress ?? "",
  //       password: password ?? "",
  //     };

  //     try {
  //       await loginUser.mutateAsync(loginRequest);

  //       if (!loginUser.error && tokenData?.accessToken !== null && isAuthenticated) {
  //         navigate(`/${AppRoutes.Dashboard}`);
  //       }
  //     } catch (error) {
  //       if (loginUser.error instanceof Error) {
  //         CustomToast({
  //           message: "Login failed",
  //           error: `Error: ${loginUser.error.message}`,
  //           type: "error",
  //         });
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (!loginUser.error && tokenData?.accessToken !== null) {
  //     navigate(`/${AppRoutes.Dashboard}`);
  //   }
  // }, [loginUser.error, navigate, tokenData?.accessToken]);

  function handleReset() {
    formik.resetForm({
      values: {
        firstName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
    });
    setValidated(false);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5">
        <Col md={6} lg={6} xs={10}>
          <Card>
            <Card.Title className="d-flex justify-content-center">
              Register Sniper
            </Card.Title>
            <Card.Body>
              <p>Fill out the form to register a new sniper</p>
              <Form
                name="registerForm"
                onSubmit={(e) => {
                  setValidated(true);
                  formik.handleSubmit(e);
                }}
              >
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    isInvalid={!!formik.errors.firstName}
                    onChange={(e) => {
                      formik.setFieldValue("firstName", e.target.value);
                      //TODO Remove this after testing
                      //setFirstName(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailAddress">
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    name="emailAddress"
                    isInvalid={!!formik.errors.emailAddress}
                    onChange={(e) => {
                      formik.setFieldValue("emailAddress", e.target.value);
                      //TODO Remove this after testing
                      // setEmailAddress(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.emailAddress}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      isInvalid={!!formik.errors.password}
                      onChange={(e) => {
                        formik.setFieldValue("password", e.target.value);
                        //TODO Remove this after testing
                        //setPassword(e.target.value);
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
                        //TODO Remove this after testing
                        //setConfirmPassword(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <div
                        className="password-toggle-icon input-group-text"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <i
                          className={`bi bi-eye${showConfirmPassword ? "" : "-slash"
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
                    <Button
                      variant="secondary"
                      type="reset"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col>
                    {registerUser.isLoading ? (
                      <Button
                        type="submit"
                        variant="secondary"
                        className={"pl-3 pr-3"}
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
                        Register
                      </Button>
                    )}
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
