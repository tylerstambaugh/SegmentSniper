import { Row, Col, Button } from "react-bootstrap";
import useProfileStore from "../../../../stores/useProfileStore";
import styles from "./RevokeStravaToken.module.scss";
import RevokeStravaTokenConfirmationModal from "./RevokeStravaTokenConfirmationModal";
import { useState } from "react";
import { DateTime } from "luxon";

const RevokeStravaToken = () => {
  const [profile] = useProfileStore((state) => [state.profileData]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <>
      <RevokeStravaTokenConfirmationModal
        showRevokeStravaTokenConfirmModal={showConfirmationModal}
        handleCloseModal={() => setShowConfirmationModal(false)}
      />
      <Row>
        <Col className="p-0">
          <div>
            <p className={`${styles.profileLabel}`}>Strava API refresh token</p>
            {!profile?.hasStravaToken ? (
              <p className={`${styles.profileValue} mb-0 pb-0`}>
                No Refresh Token Set
              </p>
            ) : (
              <div>
                <p className={`${styles.profileValue} mb-0 pb-0`}>
                  {profile?.stravaRefreshToken}
                </p>
                <div className="d-flex pt-2">
                  <p className="ps-3 pt-2 small text-muted">
                    Expires at{" "}
                    {profile?.stravaTokenExpiresAt !== null &&
                      profile?.stravaTokenExpiresAt !== undefined
                      ? DateTime.fromISO(profile.stravaTokenExpiresAt.toString()).toLocaleString(
                        DateTime.DATETIME_MED_WITH_WEEKDAY
                      )
                      : ""}
                  </p>
                  <Button
                    variant="third"
                    className={`${styles.revokeButton} ms-2`}
                    onClick={() => setShowConfirmationModal(true)}
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            )}
            <hr className={styles.hrCentered} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RevokeStravaToken;
