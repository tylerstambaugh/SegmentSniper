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
import { RegisterUserRequest } from "../services/Api/postRegisterUser";
import { usePostRegisterUser } from "../hooks/Api/Auth/usePostRegisterUser";
import toast from "react-hot-toast";
import { usePostLogin } from "../hooks/Api/usePostLogin";
import { LoginRequest } from "../services/Api/postLogin";
import { useNavigate } from "react-router-dom";
import useTokenDataStore from "../store/useTokenStore";

export default function RegisterWidget() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const registerUser = usePostRegisterUser();
  const loginUser = usePostLogin();
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
      await handleRegisterUser();
      await handleLoginUser();
    },
    validationSchema,
    validateOnChange: validated,
    validateOnBlur: validated,
  });

  async function handleRegisterUser() {
    const registerUserRequest: RegisterUserRequest = {
      firstName: firstName!,
      email: emailAddress!,
      password: password!,
    };
    try {
      await registerUser.mutateAsync(registerUserRequest);
    } catch (error) {
      toast.error(`Registration error: ${error}`);
    }
  }

  async function handleLoginUser() {
    if (!registerUser.isError && !registerUser.isLoading) {
      let loginRequest: LoginRequest = {
        userName: emailAddress ?? "",
        password: password ?? "",
      };

      try {
        await loginUser.mutateAsync(loginRequest);

        if (!loginUser.error && tokenData!.accessToken !== null) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(`login error: ${error}`);
      }
    }
  }

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

  useEffect(() => {
    if (registerUser.error) {
      toast.error(`${registerUser.error}`);
    }
  }, [registerUser.isError]);

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
                      setFirstName(e.target.value);
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
                      setEmailAddress(e.target.value);
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
                        setPassword(e.target.value);
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
                        setConfirmPassword(e.target.value);
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
                <Row>
                  <Col className="d-flex justify-content-around">
                    {registerUser.isLoading ? (
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
                      <Button variant="primary" type="submit">
                        Register
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      type="reset"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
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
