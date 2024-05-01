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
          <div className="d-flex pt-2">
            <p className="ps-3 pt-2 small text-muted">
              Expires at{" "}
              {profile?.stravaTokenExpiresAt !== null &&
              profile?.stravaTokenExpiresAt !== undefined
                ? profile?.stravaTokenExpiresAt.toLocaleString(
                    DateTime.DATETIME_FULL
                  )
                : ""}
            </p>
            <Button variant="third" className={`${styles.revokeButton} ms-2`}>
              Revoke
            </Button>
          </div>
          <hr className={styles.hrCentered} />
        </div>
      </Col>
    </Row>
  );
};

export default RevokeStravaToken;
