import { useState } from "react";
import { faCheck, faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import styles from "./EmailAddress.module.scss";
import useProfileStore from "../../../../stores/useProfileStore";
import useHandleSendChangeEmailVerificationCode from "../../../../hooks/Api/Profile/Handlers/useHandleSendChangeEmailVerificationCode";
import useHandleUpdateEmailAddress from "../../../../hooks/Api/Profile/Handlers/useHandleUpdateEmailAddress";
import VerificationCodeModal from "./VerificationCodeModal";

export type EmailAddressProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

interface EditEmailAddressForm {
  emailAddress: string;
}

const EmailAddress = ({ editMode, changeEditMode }: EmailAddressProps) => {
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [verificationCode, setVerificationCode] = useState<number | null>(null);
  const [updatedEmailAddress, setUpdatedEmailAddress] = useState<string>(
    profile?.email
  );
  const [showVerificationCodeModal, setShowVerificationCodeModal] =
    useState<boolean>(false);

  const {
    handle: handleSendChangeEmailVerificationCode,
    isLoading: handleSendEmailVerificationCodeIsLoading,
  } = useHandleSendChangeEmailVerificationCode();

  function handleVerificationCodeModalClose() {
    setShowVerificationCodeModal(false);
  }

  const [validated, setValidated] = useState(false);

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required")
      .nonNullable()
      .typeError("Email address must be a string"),
  });
  const initialValues = {
    emailAddress: profile.email,
  };

  const formik = useFormik<EditEmailAddressForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: EditEmailAddressForm) => {
      setValidated(true);
      handleSendChangeEmailVerificationCode(updatedEmailAddress);
      setShowVerificationCodeModal(true);
      changeEditMode(false);
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <>
      <VerificationCodeModal
        emailAddress={updatedEmailAddress}
        onVerificationCodeChange={setVerificationCode}
        showVerificationCodeModal={showVerificationCodeModal}
        handleVerificationCodeModalClose={handleVerificationCodeModalClose}
      />
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>Email address</p>
            {editMode ? (
              <span className="d-flex my-0">
                <Form
                  name="editEmailAddressForm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setValidated(true);
                    formik.handleSubmit(event);
                  }}
                >
                  <Form.Group controlId="formEditName">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={formik.values.emailAddress ?? ""}
                      name="firstName"
                      isInvalid={!!formik.errors.emailAddress}
                      onChange={(e) => {
                        formik.setFieldValue("firstName", e.target.value);
                      }}
                      className={`${styles.firstNameInput} ${styles.profileValue}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.emailAddress as FormikErrors<string>}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>

                <Button
                  variant="primary"
                  className={`mx-2 ${styles.editProfileFaButton}`}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} className="fa-md" />
                </Button>

                <Button
                  variant="third"
                  className={` ${styles.editProfileFaButton} mx-2`}
                  onClick={() => {
                    changeEditMode(false);
                  }}
                >
                  <FontAwesomeIcon icon={faX} className="fa-md" />
                </Button>
              </span>
            ) : (
              <span className="d-flex my-0">
                <p className={styles.profileValue}>{profile?.email}</p>{" "}
                <Button
                  type="submit"
                  variant="secondary"
                  className={`px-1 py-0 my-0 ${styles.editProfileFaButton}`}
                  onClick={() => {
                    changeEditMode(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="fa-md" />
                </Button>
              </span>
            )}
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default EmailAddress;
