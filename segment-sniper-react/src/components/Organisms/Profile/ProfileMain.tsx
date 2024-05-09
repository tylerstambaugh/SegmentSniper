import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./ProfileMain.module.scss";
import useProfileStore from "../../../stores/useProfileStore";

import { useGetProfileQuery } from "../../../hooks/Api/Profile/useGetProfileQuery";
import { faCameraAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../App.css";
import { useState } from "react";
import ProfileName from "../../Molecules/Profile/Name/ProfileName";
import EmailAddress from "../../Molecules/Profile/EmailAddress/EmailAddress";
import UpdatePassword from "../../Molecules/Profile/Password/UpdatePassword";
import RevokeStravaToken from "../../Molecules/Profile/StravaToken/RevokeStravaToken";
import DeleteAccountConfirmationModal from "../../Molecules/Profile/DeleteAccount/DeleteAccountConfirmationModal";

export default function ProfileMain() {
  useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const handleEditModeChange = (componentName: string) => {
    setEditMode((prev) => (prev === componentName ? null : componentName));
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center border border-dark rounded"
      style={{ width: "auto" }}
    >
      <Row
        className={`${styles.imageBackground} justify-content-center p-0 m-0}`}
      >
        <Col sm={5} className="text-center px-1 mx-0">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} className="fa-8x py-3" />
            <Button
              variant="secondary"
              className={styles.cameraButton}
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              <FontAwesomeIcon icon={faCameraAlt} className="fa-2x m-0  " />
            </Button>
          </div>
        </Col>
      </Row>
      <EmailAddress
        editMode={editMode === "EmailAddress"}
        changeEditMode={() => handleEditModeChange("EmailAddress")}
      />
      <ProfileName
        editMode={editMode === "ProfileName"}
        changeEditMode={() => handleEditModeChange("ProfileName")}
      />
      {/* I got hit by a car. Taking the night off. */}
      <UpdatePassword
        editMode={editMode === "UpdatePassword"}
        changeEditMode={() => handleEditModeChange("UpdatePassword")}
      />
      <RevokeStravaToken />
      <Row>
        <Col>
          <DeleteAccountConfirmationModal
            showDeleteAccountModal={editMode === "DeleteAccount"}
            handleCloseModal={() => handleEditModeChange("")}
          />
          <Button
            variant="third"
            className={styles.deleteAccountButton}
            onClick={() => handleEditModeChange("DeleteAccount")}
          >
            DELETE ACCOUNT
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
