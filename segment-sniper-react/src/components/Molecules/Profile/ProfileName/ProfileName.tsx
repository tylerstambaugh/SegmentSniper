import { faCheck, faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profile } from "console";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import styles from "../ProfileName/ProfileName.module.scss";
import useProfileStore from "../../../../stores/useProfileStore";
import { useState } from "react";
import useHandleUpdateFirstName from "../../../../hooks/Api/Profile/Handlers/useHandleUpdateFirstName";

export type ProfileNameProps = {
  editMode: boolean;
  changeEditMode: (isEditMode: boolean) => void;
};

const ProfileName: React.FC<ProfileNameProps> = ({
  editMode,
  changeEditMode,
}) => {
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [editFirstName, setEditFirstName] = useState<boolean>(editMode);

  const [updatedFirstName, setUpdatedFirstName] = useState<string>("");
  const { handle: handleUpdateFirstName, isLoading: updateFirstNameIsLoading } =
    useHandleUpdateFirstName();

  return (
    <Row>
      <Col className="p-0">
        <div>
          <p className={styles.profileLabel}>First name</p>
          {editMode ? (
            <span className="d-flex my-0">
              <input
                type="text"
                className={styles.editProfileValue}
                defaultValue={profile.firstName}
                onChange={(e) => {
                  setUpdatedFirstName(e.target.value);
                }}
              />
              {updateFirstNameIsLoading ? (
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
                    handleUpdateFirstName(updatedFirstName);
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
              <p className={styles.profileValue}>{profile.firstName}</p>{" "}
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
  );
};

export default ProfileName;
