import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import styles from "./DeleteAccountConfirmationModal.module.scss";
import { useState } from "react";
import { useDeleteAccount } from "../../../../hooks/Api/Profile/useDeleteAccount";
import useProfileStore from "../../../../stores/useProfileStore";

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
  const [validated, setValidated] = useState(false);
  const emailAddress = useProfileStore((state) => state.profileData?.email);
  const { mutateAsync: deleteAccount, isLoading } = useDeleteAccount();

  const validationSchema = yup.object({
    confirmationText: yup
      .string()
      .required("Confirmation is required")
      //.email("Please enter a valid email address")
      .typeError("Confirmation must be a string")
      .test(
        "email-match",
        "Confirmation must match email address",
        function (value) {
          return value === emailAddress;
        }
      ),
  });

  const formik = useFormik<DeleteAccountForm>({
    initialValues: { confirmationText: null },
    enableReinitialize: true,
    onSubmit: async () => {
      setValidated(true);
      await deleteAccount();
      handleCloseModal();
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <Modal show={showDeleteAccountModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Account Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="px-2 py-2">
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
                    name="confirmationText"
                    isInvalid={!!formik.errors.confirmationText}
                    onChange={(e) => {
                      formik.setFieldValue("confirmationText", e.target.value);
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
              <Button
                variant="third"
                onClick={() => formik.handleSubmit()}
                className={`${styles.deleteAccountButton}`}
              >
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
