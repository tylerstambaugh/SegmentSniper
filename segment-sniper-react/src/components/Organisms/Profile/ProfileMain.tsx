import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./ProfileMain.module.scss";
import useProfileStore from "../../../stores/useProfileStore";

import { useGetProfileQuery } from "../../../hooks/Api/Profile/useGetProfileQuery";
import {
  faCameraAlt,
  faUserCircle,
  faEdit,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../App.css";
import { useEffect, useState } from "react";
import ProfileName from "../../Molecules/Profile/ProfileName/ProfileName";
import EmailAddress from "../../Molecules/Profile/EmailAddress/EmailAddress";

export default function ProfileMain() {
  const getProfile = useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [editEmailAddress, setEditEmailAddress] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editFirstName, setEditFirstName] = useState<boolean>(false);

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
      <Row>
        <Col className="p-0 m-0">
          <div>
            <p className={styles.profileLabel}>Password</p>
            <span className="d-flex align-items-start">
              <p className={`${styles.profileValue} m-0`}>**********</p>
              <Button className={`btn-third p-0 me-4`}>Update</Button>
            </span>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          <div>
            <p className={`${styles.profileLabel}`}>Strava API Refresh Token</p>
            <p className={`${styles.profileValue} mb-0 pb-0`}>
              {profile.hasStravaToken
                ? profile.stravaRefreshToken
                : "No Refresh Token Set"}
            </p>
            <p className="ps-3 py-0 small text-muted">
              Expires at{" "}
              {/* {!!profile.stravaTokenExpiresAt
                ? profile.stravaTokenExpiresAt.toFormat("yyyy-MM-dd HH:mm:ss")
                : ""} */}
            </p>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
