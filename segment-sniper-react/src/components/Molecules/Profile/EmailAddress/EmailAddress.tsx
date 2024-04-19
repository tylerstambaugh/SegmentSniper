import { useState } from "react";
import { faCheck, faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import styles from "./EmailAddress.module.scss";
import useProfileStore from "../../../../stores/useProfileStore";
import useHandleSendChangeEmailVerificationCode from "../../../../hooks/Api/Profile/Handlers/useHandleSendChangeEmailVerificationCode";
import useHandleUpdateEmailAddress from "../../../../hooks/Api/Profile/Handlers/useHandleUpdateEmailAddress";
import VerificationCodeModal from "./VerificationCodeModal";

export type EmailAddressProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

const EmailAddress = ({ editMode, changeEditMode }: EmailAddressProps) => {
  const [profile] = useProfileStore((state) => [state.profileData]);

  const [updatedEmailAddress, setUpdatedEmailAddress] = useState<string>(
    profile.email
  );
  const [showVerificationCodeModal, setShowVerificationCodeModal] =
    useState<boolean>(false);

  const {
    handle: handleUpdateEmailAddress,
    isLoading: updateEmailAddressIsLoading,
  } = useHandleUpdateEmailAddress();

  const {
    handle: handleSendChangeEmailVerificationCode,
    isLoading: handleSendEmailVerificationCodeIsLoading,
  } = useHandleSendChangeEmailVerificationCode();

  function handleVerificationCodeModalClose() {
    setShowVerificationCodeModal(false);
  }

  return (
    <>
      <VerificationCodeModal
        emailAddress={updatedEmailAddress}
        showVerificationCodeModal={showVerificationCodeModal}
        handleVerificationCodeModalClose={handleVerificationCodeModalClose}
      />
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>Email address</p>
            {editMode ? (
              <span className="d-flex my-0">
                <input
                  type="text"
                  className={styles.editProfileValue}
                  defaultValue={profile.email}
                  onChange={(e) => {
                    setUpdatedEmailAddress(e.target.value);
                  }}
                />
                {updateEmailAddressIsLoading ? (
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
                    className={`mx-2 ${styles.editProfileFaButton}`}
                    onClick={(e) => {
                      handleSendChangeEmailVerificationCode(
                        updatedEmailAddress
                      );
                      setShowVerificationCodeModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="fa-md" />
                  </Button>
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
              </span>
            ) : (
              <span className="d-flex my-0">
                <p className={styles.profileValue}>{profile.email}</p>{" "}
                <Button
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
