import { Row, Modal, Col, Button, Form } from "react-bootstrap";
import styles from "./VerificationCodeModal.module.scss";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

interface VerificationCodeForm {
  verificationCode: number | null;
}

export type VerificationCodeModalProps = {
  emailAddress: string;
  showVerificationCodeModal: boolean;
  handleVerificationCodeModalClose: () => void;
};

const VerificationCodeModal = ({
  emailAddress,
  showVerificationCodeModal,
  handleVerificationCodeModalClose,
}: VerificationCodeModalProps) => {
  const [validated, setValidated] = useState(false);
  //const [useHand]
  const [verificationCode, setVerificationCode] = useState<number | null>(null);
  const validationSchema = yup.object({
    verificationCode: yup
      .number()
      .required("Verification code is required")
      .typeError("Verification code must be a number"),
  });
  const initialValues = {
    verificationCode: null,
  };
  const formik = useFormik<VerificationCodeForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (verificationCode: VerificationCodeForm) => {
      setValidated(true);
      //handleVerifyCode(verificationCode);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <Row>
      <Modal show={showVerificationCodeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Activity Search</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Col className="px-2">
            <Row>
              <p className={styles.helpModalSubTitle}>
                We've sent a verification code to {emailAddress}. Please check
                your email and enter the code.
              </p>
              <Form
                name="verificationCodeForm"
                onSubmit={(event) => {
                  event.preventDefault();
                  setValidated(true);
                  formik.handleSubmit(event);
                }}
              >
                <Row className=" justify-content-center mb-3">
                  <Col className="mb-2">
                    <Form.Group controlId="formVerificationCode">
                      <Form.Label id="verificationCodeLabel">
                        Verification code:
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder=""
                        value={verificationCode ?? ""}
                        name="verificationCode"
                        isInvalid={!!formik.errors.verificationCode}
                        onChange={(e) => {
                          setVerificationCode(
                            e.target.value as unknown as number
                          );
                        }}
                        className={`${styles.verificationCodeInput}`}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.verificationCode as FormikErrors<string>}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => formik.handleSubmit}
          ></Button>
          <Button
            variant="secondary"
            onClick={handleVerificationCodeModalClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default VerificationCodeModal;
