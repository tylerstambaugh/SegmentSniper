import { useState } from "react";
import { faCheck, faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button, Spinner, Form } from "react-bootstrap";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import styles from "./EmailAddress.module.scss";
import useProfileStore from "../../../../stores/useProfileStore";
import useHandleSendChangeEmailVerificationCode from "../../../../hooks/Api/Profile/Handlers/useHandleSendChangeEmailVerificationCode";
import VerificationCodeModal from "./VerificationCodeModal";

export type EmailAddressProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

interface EditEmailAddressForm {
  emailAddress: string;
}

const EmailAddress = ({ editMode, changeEditMode }: EmailAddressProps) => {
  const [emailAddress] = useProfileStore((state) => [
    state.profileData?.email ?? "",
  ]);
  const [showVerificationCodeModal, setShowVerificationCodeModal] =
    useState<boolean>(false);

  const {
    handle: handleSendChangeEmailVerificationCode,
    isLoading: handleSendEmailVerificationCodeIsLoading,
    error: handleSendEmailVerificationCodeError,
  } = useHandleSendChangeEmailVerificationCode();

  function handleVerificationCodeModalClose() {
    setShowVerificationCodeModal(false);
  }
  const [newEmailAddress, setNewEmailAddress] = useState<string | null>(
    emailAddress
  );
  const [validated, setValidated] = useState(false);

  const validationSchema = yup.object({
    emailAddress: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });
  const initialValues = {
    emailAddress: emailAddress,
  };

  const formik = useFormik<EditEmailAddressForm>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values: EditEmailAddressForm) => {
      setValidated(true);

      await handleSendChangeEmailVerificationCode(values.emailAddress);
      if (
        !handleSendEmailVerificationCodeIsLoading &&
        !handleSendEmailVerificationCodeError
      ) {
        setShowVerificationCodeModal(true);
        changeEditMode(false);
        formik.setFieldValue("emailAddress", emailAddress);
      }
    },
    validationSchema: validationSchema,
    validateOnBlur: validated,
    validateOnChange: validated,
  });

  return (
    <>
      <VerificationCodeModal
        emailAddress={newEmailAddress ?? ""}
        showVerificationCodeModal={showVerificationCodeModal}
        handleVerificationCodeModalClose={handleVerificationCodeModalClose}
      />
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>Email address</p>
            {editMode ? (
              <span className="d-flex  my-0">
                <Form
                  name="editEmailAddressForm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setValidated(true);
                    formik.handleSubmit();
                  }}
                  className="d-flex"
                >
                  <Form.Group
                    controlId="formEditEmail"
                    className="flex-grow-1 mr-2"
                  >
                    <Form.Control
                      type="email"
                      placeholder=""
                      value={formik.values.emailAddress ?? ""}
                      name="emailAddress"
                      isInvalid={!!formik.errors.emailAddress}
                      onChange={(e) => {
                        formik.setFieldValue("emailAddress", e.target.value);
                        setNewEmailAddress(e.target.value);
                      }}
                      className={`${styles.emailAddressInput} ${styles.profileValue}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.emailAddress as FormikErrors<string>}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {handleSendEmailVerificationCodeIsLoading ? (
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
                    <>
                      <Button
                        type="submit"
                        variant="primary"
                        className={`mx-2 ${styles.editProfileFaButton}`}
                      >
                        <FontAwesomeIcon icon={faCheck} className="fa-md" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="third"
                    className={` ${styles.editProfileFaButton} mx-2`}
                    onClick={() => {
                      changeEditMode(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faX} className="fa-md" />
                  </Button>
                </Form>
              </span>
            ) : (
              <span className="d-flex my-0">
                <p className={styles.profileValue}>{emailAddress}</p>{" "}
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
