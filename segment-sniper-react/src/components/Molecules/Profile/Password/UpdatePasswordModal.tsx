import {
  Row,
  Modal,
  Col,
  Button,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";

import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import {  useState } from "react";
import styles from "../Password/UpdatePasswordModal.module.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHandleUpdatePassword from "../../../../hooks/Api/Profile/Handlers/useHandleUpdatePassword";

interface UpdatePasswordForm {
  currentPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}
export type UpdatePasswordModalProps = {
  showUpdatePasswordModal: boolean;
  handleUpdatePasswordModalClose: () => void;
};

const UpdatePasswordModal = ({
  showUpdatePasswordModal,
  handleUpdatePasswordModalClose,
}: UpdatePasswordModalProps) => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [validated, setValidated] = useState(false);

  const { handle: updatePassword, isLoading } = useHandleUpdatePassword();

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required("Current password is required")
      .typeError("Current password must be a string"),
    newPassword: yup
      .string()
      .required("New password is required")
      .typeError("New password must be a string")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{7,99}$/,
        "Must contain at least 7 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      ),
    confirmNewPassword: yup
      .string()
      .required("New password is required")
      .typeError("New password must be a stirng")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{7,99}$/,
        "Must contain at least 7 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number"
      )
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });

  const initialValues = {
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  };

  const formik = useFormik<UpdatePasswordForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: UpdatePasswordForm) => {
      setValidated(true);
      await updatePassword(values.currentPassword!, values.newPassword!);
      handleUpdatePasswordModalClose();
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible((prevVisible) => !prevVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible((prevVisible) => !prevVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <Modal show={showUpdatePasswordModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Col className="px-2">
          <Row>
            <Form
              name="updatePasswordForm"
              onSubmit={(event) => {
                event.preventDefault();
                setValidated(true);
                formik.handleSubmit(event);
              }}
            >
              <Row className=" justify-content-center mb-3">
                <Col className="mb-2">
                  <Form.Group controlId="formUpdatePassword">
                    <Form.Label id="currentPasswordLabel">
                      Current password:
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={currentPasswordVisible ? "text" : "password"}
                        placeholder=""
                        value={formik.values.currentPassword ?? ""}
                        name="currentPassword"
                        isInvalid={!!formik.errors.currentPassword}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "currentPassword",
                            e.target.value
                          );
                        }}
                        className={`${styles.currentPasswordInput}`}
                      />
                      <Button variant="third">
                        <FontAwesomeIcon
                          icon={currentPasswordVisible ? faEyeSlash : faEye}
                          onClick={toggleCurrentPasswordVisibility}
                          className="password-toggle"
                        />
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.currentPassword as FormikErrors<string>}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className=" justify-content-center mb-3">
                <Col className="mb-2">
                  <Form.Group controlId="formUpdatePassword">
                    <Form.Label id="newPasswordLabel">New password:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={newPasswordVisible ? "text" : "password"}
                        placeholder=""
                        value={formik.values.newPassword ?? ""}
                        name="newPassword"
                        isInvalid={!!formik.errors.newPassword}
                        onChange={(e) => {
                          formik.setFieldValue("newPassword", e.target.value);
                        }}
                        className={`${styles.newPasswordInput}`}
                      />
                      <Button variant="third">
                        <FontAwesomeIcon
                          icon={newPasswordVisible ? faEyeSlash : faEye}
                          onClick={toggleNewPasswordVisibility}
                          className="password-toggle"
                        />
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.newPassword as FormikErrors<string>}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className=" justify-content-center mb-3">
                <Col className="mb-2">
                  <Form.Group controlId="formUpdatePassword">
                    <Form.Label id="confirmNewPasswordLabel">
                      Confirm New password:
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder=""
                        value={formik.values.confirmNewPassword ?? ""}
                        name="confirmNewPassword"
                        isInvalid={!!formik.errors.confirmNewPassword}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "confirmNewPassword",
                            e.target.value
                          );
                        }}
                        className={`${styles.confirmNewPasswordInput}`}
                      />
                      <Button variant="third">
                        <FontAwesomeIcon
                          icon={confirmPasswordVisible ? faEyeSlash : faEye}
                          onClick={toggleConfirmPasswordVisibility}
                          className="password-toggle"
                        />
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmNewPassword as FormikErrors<string>}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-end">
          <Col className="col-auto ml-auto">
            {isLoading ? (
              <>
                <Button
                  variant="secondary"
                  className={`me-1 ${styles.editProfileFaButton} `}
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
              </>
            ) : (
              <Button variant="primary" onClick={() => formik.handleSubmit()}>
                Submit
              </Button>
            )}
          </Col>
          <Col className="col-auto">
            <Button
              variant="secondary"
              onClick={() => {
                handleUpdatePasswordModalClose();
                setValidated(false);
                formik.resetForm({});
              }}
            >
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePasswordModal;