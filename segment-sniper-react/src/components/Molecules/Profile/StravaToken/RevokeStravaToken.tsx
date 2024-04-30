import { Row, Col, Button } from "react-bootstrap";
import useProfileStore from "../../../../stores/useProfileStore";
import styles from "./RevokeStravaToken.module.scss";
import { DateTime } from "luxon";

const RevokeStravaToken = () => {
  const [profile] = useProfileStore((state) => [state.profileData]);

  return (
    <Row>
      <Col className="p-0">
        <div>
          <p className={`${styles.profileLabel}`}>Strava API refresh token</p>
          <p className={`${styles.profileValue} mb-0 pb-0`}>
            {profile?.hasStravaToken
              ? profile?.stravaRefreshToken
              : "No Refresh Token Set"}
          </p>
          <div className="d-flex">
            <Col>
              <p className="ps-3 py-0 small text-muted">
                Expires at{" "}
                {profile?.stravaTokenExpiresAt !== null &&
                profile?.stravaTokenExpiresAt !== undefined
                  ? profile?.stravaTokenExpiresAt.toLocaleString(
                      DateTime.DATETIME_FULL
                    )
                  : ""}
              </p>
            </Col>
            <Col>
              <Button variant="third" className={`${styles.revokeButton}`}>
                Revoke
              </Button>
            </Col>
          </div>
          <hr className={styles.hrCentered} />
        </div>
      </Col>
    </Row>
  );
};

export default RevokeStravaToken;
