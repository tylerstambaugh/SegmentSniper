import { Row, Modal, Col, Button, Form, Spinner } from "react-bootstrap";

import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import styles from "../Password/UpdatePasswordModal.module.scss";
import { usePostUpdatePassword } from "../../../../hooks/Api/Profile/usePostUpdatePassword";

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
  const [validated, setValidated] = useState(false);

  const {
    mutateAsync: updatePassword,
    isLoading,
    isError,
  } = usePostUpdatePassword();

  const validationSchema = yup.object({
    verificationCode: yup
      .number()
      .required("Verification code is required")
      .typeError("Verification code must be a number"),
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
      await updatePassword({
        currentPassword: values.currentPassword!,
        newPassword: values.newPassword!,
      });
      handleUpdatePasswordModalClose();
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });
  return (
    <>
      {showUpdatePasswordModal ? (
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>Update Paswword</Modal.Title>
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
                        <Form.Control
                          type="string"
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
                        <Form.Control.Feedback type="invalid">
                          {
                            formik.errors
                              .currentPassword as FormikErrors<string>
                          }
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
                  <Button
                    variant="primary"
                    onClick={() => formik.handleSubmit()}
                  >
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
      ) : (
        <> </>
      )}
    </>
  );
};

export default UpdatePasswordModal;
