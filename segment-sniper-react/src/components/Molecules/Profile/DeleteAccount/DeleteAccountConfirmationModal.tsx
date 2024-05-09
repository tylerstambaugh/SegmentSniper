import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import useHandleDeleteStravaToken from "../../../../hooks/Api/Profile/Handlers/useHandleDeleteStravaToken";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import styles from "./DeleteAccountConfirmationModalmodule.scss";
import { useState } from "react";
import deleteAccount from "../../../../services/Api/Profile/deleteAccount";
import { useDeleteAccount } from "../../../../hooks/Api/Profile/useDeleteAccount";

interface DeleteAccountForm {
  confirmationText: string | null;
}

export type DeleteAccountModalProps = {
  showDeleteAccountModal: boolean;
  handleCloseModal: () => void;
};

const DeleteAccountConfirmationModal = ({
  showDeleteAccountModal,
  handleCloseModal,
}: DeleteAccountModalProps) => {
  const { handle: revokeStravaToken, isLoading } = useHandleDeleteStravaToken();
  const [validated, setValidated] = useState(false);
  const deleteAccount = useDeleteAccount();
  function handleConfirmClick() {
    revokeStravaToken().then(() => handleCloseModal);
  }

  const validationSchema = yup.object({
    confirmationText: yup
      .string()
      .required("Confirmation is required")
      .typeError("Confirmation must be a string"),
  });

  const formik = useFormik<DeleteAccountForm>({
    initialValues: { confirmationText: null },
    enableReinitialize: true,
    onSubmit: async (values: DeleteAccountForm) => {
      setValidated(true);
      await deleteAccount.mutateAsync();
      handleCloseModal();
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <Modal show={showDeleteAccountModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Token Revocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="px-2">
          <Row>
            <p>
              Are you sure you would like to delete you Segment Sniper Pro
              account? All your information will be deleted. This cannot be
              undone.
            </p>
          </Row>
          <Row>
            <p>
              To proceed, type your email address in the box and press DELETE.
            </p>
          </Row>
          <Row>
            <Form
              name="deleteAccountForm"
              onSubmit={(event) => {
                event.preventDefault();
                setValidated(true);
                formik.handleSubmit(event);
              }}
            >
              <Form.Group controlId="emailAddressConfirmation">
                <Form.Label id="emailAddressConfirmation">
                  Email address:
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={"text"}
                    placeholder=""
                    value={formik.values.confirmationText ?? ""}
                    name="currentPassword"
                    isInvalid={!!formik.errors.confirmationText}
                    onChange={(e) => {
                      formik.setFieldValue("currentPassword", e.target.value);
                    }}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmationText as FormikErrors<string>}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Row className="justify-content-end">
          <Col className="col-auto ml-auto">
            {isLoading ? (
              <>
                <Button variant="secondary" className={`me-1 `}>
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
              <Button variant="third" onClick={() => handleConfirmClick()}>
                DELETE
              </Button>
            )}
          </Col>
          <Col className="col-auto">
            <Button
              variant="secondary"
              onClick={() => {
                handleCloseModal();
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

export default DeleteAccountConfirmationModal;
