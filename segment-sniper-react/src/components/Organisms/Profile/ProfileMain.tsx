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
import { useState } from "react";
import { CustomToast } from "../../Molecules/Toast/CustomToast";
import useHandleUpdateFirstName from "../../../hooks/Api/Profile/Handlers/useHandleUpdateFirstName";

export default function ProfileMain() {
  const getProfile = useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [editEmailAddress, setEditEmailAddress] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [updatedFirstName, setUpdatedFirstName] = useState<string>("");
  const updateFirstName = useHandleUpdateFirstName();

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
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>Email address</p>
            {editEmailAddress ? (
              <span className="d-flex my-0">
                <input
                  type="text"
                  className={styles.editProfileValue}
                  defaultValue={profile.email}
                />
                <Button
                  variant="primary"
                  className={`mx-2 ${styles.editProfileFaButton}`}
                  onClick={() => {
                    setEditEmailAddress(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} className="fa-md" />
                </Button>
                <Button
                  variant="third"
                  className={` ${styles.editProfileFaButton} mx-2`}
                  onClick={() => {
                    setEditEmailAddress(false);
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
                    setEditEmailAddress(true);
                    setEditFirstName(false);
                    setEditPassword(false);
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
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>First name</p>
            {editFirstName ? (
              <span className="d-flex my-0">
                <input
                  type="text"
                  className={styles.editProfileValue}
                  defaultValue={profile.firstName}
                  onChange={(e) => {
                    setUpdatedFirstName(e.target.value);
                  }}
                />
                {updateFirstName.isLoading ? (
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
                      updateFirstName.handle(updatedFirstName);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="fa-md" />
                  </Button>
                )}
                <Button
                  variant="third"
                  className={` ${styles.editProfileFaButton} mx-2`}
                  onClick={() => {
                    setEditFirstName(false);
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
                    setEditEmailAddress(false);
                    setEditFirstName(true);
                    setEditPassword(false);
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
