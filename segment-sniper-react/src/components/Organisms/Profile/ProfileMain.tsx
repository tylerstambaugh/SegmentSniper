import { Button, Col, Container, Row } from "react-bootstrap";
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

export default function ProfileMain() {
  const getProfile = useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [editEmailAddress, setEditEmailAddress] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editFirstName, setEditFirstName] = useState<boolean>(false);

  return (
    <Container
      className="d-flex flex-column justify-content-center border border-dark rounded mx-auto"
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
            <Row>
              <Col>
                <p className={styles.profileValue}>{profile.userName}</p>{" "}
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  className={`px-1 py-0 my-0 ${styles.editProfileFaButton}`}
                  onClick={() => {
                    setEditEmailAddress(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="fa-md" />
                </Button>
              </Col>
            </Row>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>First name</p>
            <Row>
              {editFirstName ? (
                <>
                  <Col>
                    <input
                      type="text"
                      className={styles.editProfileValue}
                      defaultValue={profile.firstName}
                    />
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className={`mx-2 ${styles.editProfileFaButton}`}
                      onClick={() => {
                        setEditFirstName(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} className="fa-md" />
                    </Button>
                    <Button
                      variant="third"
                      className={` ${styles.editProfileFaButton} mx-2`}
                      onClick={() => {
                        setEditFirstName(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faX} className="fa-md" />
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                    <p className={styles.profileValue}>{profile.firstName}</p>{" "}
                  </Col>
                  <Col className="d-flex justify-content-end me-3">
                    <Button
                      variant="secondary"
                      className={`px-1 py-0 my-0  ${styles.editProfileFaButton}`}
                      onClick={() => {
                        setEditFirstName(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} className="fa-md" />
                    </Button>
                  </Col>
                </>
              )}
            </Row>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-0 m-0">
          <div>
            <p className={styles.profileLabel}>Password</p>
            <span className="d-flex align-items-start justify-content-between">
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
