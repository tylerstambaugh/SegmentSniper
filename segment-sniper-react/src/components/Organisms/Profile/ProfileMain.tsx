import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./ProfileMain.module.scss";
import useProfileStore from "../../../stores/useProfileStore";
import { useGetProfileQuery } from "../../../hooks/Api/Profile/useGetProfileQuery";
import { faCameraAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../App.css";

export default function ProfileMain() {
  const getProfile = useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);

  return (
    <Container
      className="d-flex flex-column justify-content-center border border-dark px-2 rounded"
      style={{ width: "auto" }}
    >
      <Row className="justify-content-center ">
        <Col sm={5} className="text-center px-1">
          <div
            className={styles.imageBackground}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} className="fa-8x py-3" />
            <Button
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
            <p className={styles.profileLabel}>Username:</p>
            <p className={styles.profileValue}>{profile.userName}</p>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          <div>
            <p className={styles.profileLabel}>First name:</p>
            <p className={styles.profileValue}>{profile.firstName}</p>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-0 m-0">
          <div>
            <p className={styles.profileLabel}>Password:</p>
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
            <p className={styles.profileLabel}>Strava Access Token:</p>
            <p className={styles.profileValue}>
              Mf5skumMFjzdlzvbXxXpFdqdAKfW3mq4yHQY+VoU48Z5L/VXU8Fzx1+CFFjkV3gWvtZqUvLu
            </p>
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
