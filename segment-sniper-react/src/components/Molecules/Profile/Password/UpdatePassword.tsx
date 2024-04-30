import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import styles from "../Password/UpdatePassword.module.scss";
import UpdatePasswordModal from "./UpdatePasswordModal";

export type UpdatePasswordProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

const UpdatePassword = ({ editMode, changeEditMode }: UpdatePasswordProps) => {
  function handleShowUpdatePasswordModalClose() {
    changeEditMode(false);
  }

  return (
    <>
      <UpdatePasswordModal
        showUpdatePasswordModal={editMode}
        handleUpdatePasswordModalClose={handleShowUpdatePasswordModalClose}
      />
      <Row>
        <Col className="p-0 m-0">
          <div>
            <p className={styles.profileLabel}>Password</p>
            <span className="d-flex align-items-start">
              <p className={`${styles.profileValue} m-0`}>**********</p>
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
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UpdatePassword;
