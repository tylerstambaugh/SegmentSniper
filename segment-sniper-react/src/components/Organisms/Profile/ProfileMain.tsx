import { Col, Container, Row } from "react-bootstrap";
import styles from "./ProfileMain.module.scss";
import useProfileStore from "../../../stores/useProfileStore";
import { useGetProfileQuery } from "../../../hooks/Api/Profile/useGetProfileQuery";

export default function ProfileMain() {
  const getProfile = useGetProfileQuery();
  const [profile] = useProfileStore((state) => [state.profileData]);

  return (
    <Container
      className="d-flex flex-column justify-content-center"
      style={{ width: "auto" }}
    >
      <Row>
        <Col>
          <div className={styles.imageBackground}>
            <h2>{profile.firstName}'s Profile</h2>
          </div>
        </Col>
      </Row>
      <></>
    </Container>
  );
}
