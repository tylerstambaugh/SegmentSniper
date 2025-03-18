import { Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { SnipeSegmentListItem } from '../../../../models/Segment/SnipeSegmentListItem';
import { usePostStarSegment } from '../../../../hooks/Api/Segments/usePostStarSegment';
import useSnipeSegmentsListStore from '../../../../stores/useSnipeSegmentsListStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faCrown as crown } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import ActivityMap from '../../Activity/ActivityMap/ActivityMap';
import { useTimeFormatConverter } from '../../../../hooks/useTimeFormatConverter';
import { useState } from 'react';
import styles from './SnipeSegmentCard.module.scss';
import { CustomToast } from '../../Toast/CustomToast';
import { Link } from 'react-router-dom';

type SnipedSegmentCardProps = {
  snipeSegment: SnipeSegmentListItem;
  leaderTypeQom: boolean;
};

const SnipeSegmentCard = ({
  snipeSegment,
  leaderTypeQom,
}: SnipedSegmentCardProps) => {
  const { mutateAsync, isLoading, isError, error, data } = usePostStarSegment();
  const convertTime = useTimeFormatConverter();
  const [setQueriedSnipeSegmentsList] = useSnipeSegmentsListStore((state) => [
    state.setQueriedSnipeSegmentsList,
  ]);
  const [comparePrTime, setComparePrTIme] = useState(true);

  const updateSegmentEffortStarred = (
    snipedSegmentEffortList: SnipeSegmentListItem[],
    segmentId: string,
    starred: boolean
  ) => {
    return snipedSegmentEffortList.map((item) =>
      item.segmentId === segmentId ? { ...item, starred: starred } : item
    );
  };

  async function handleStarButtonClick() {
    try {
      const response = await mutateAsync({
        segmentId: snipeSegment.segmentId!,
        star: !snipeSegment.starred,
      });

      if (!isError && !isLoading && response !== null) {
        setQueriedSnipeSegmentsList((prevList: SnipeSegmentListItem[]) =>
          updateSegmentEffortStarred(
            prevList,
            response.detailedSegment.segmentId,
            response.detailedSegment.starred
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: 'Star failed',
          error: `Error: ${error.message}`,
          type: 'error',
        });
      } else {
        CustomToast({
          message: 'Star failed',
          error: `Error: Unknown`,
          type: 'error',
        });
      }
    }
  }

  const myTime: string = convertTime.numericTimeToString(
    snipeSegment.detailedSegmentEffort?.elapsedTime ?? 9999
  );

  const myPrTime: string = convertTime.numericTimeToString(
    snipeSegment.athleteSegmentStats?.prElapsedTime ?? 9999
  );

  const linkToSegmentOnStrava: string = `https://www.strava.com/segments/${snipeSegment.segmentId}`;

  return (
    <Col className="py-2 px-2">
      <Card>
        <Card.Title className={`mb-0 pt-2 ${styles.title}`}>
          <Col>
            <Row className="justify-content-around">
              <Col>
                <Link to={linkToSegmentOnStrava} target='blank'>{snipeSegment.name}</Link>

                {(!leaderTypeQom && snipeSegment.secondsFromKom === 0) ||
                  (leaderTypeQom && snipeSegment.secondsFromQom === 0) ? (
                  <FontAwesomeIcon icon={crown} className="ps-2" />
                ) : (
                  <></>
                )}
              </Col>
              <Col className="d-flex justify-content-end p-0">
                <p className={`pt-1 ${styles.switch_label}`}>Compare PR:</p>
                <Form.Check
                  type="switch"
                  checked={comparePrTime}
                  id="comparePrSwitch"
                  onChange={(e) => {
                    setComparePrTIme(e.target.checked);
                  }}
                  className={styles.switch}
                />
              </Col>
            </Row>
          </Col>
        </Card.Title>
        <Card.Body className="py-0">
          <Col>
            <Row>
              <Col className="p-3" md={12} lg={6}>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">Distance:</span>{' '}
                    </p>
                    <p className="mb-0">{snipeSegment.distance} mi.</p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        {!leaderTypeQom ? `KOM Time:` : `QOM Time:`}
                      </span>
                    </p>
                    <p className="mb-0">
                      {!leaderTypeQom
                        ? snipeSegment.komTime
                        : snipeSegment.qomTime}
                    </p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        {comparePrTime ? 'My PR Time:' : 'My Time'}
                      </span>
                    </p>
                    <p className="mb-0">{comparePrTime ? myPrTime : myTime}</p>
                  </Col>
                </Row>

                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        Time Behind {!leaderTypeQom ? `KOM:` : `QOM:`}
                      </span>
                    </p>
                    <p className="mb-0">
                      -
                      {!leaderTypeQom
                        ? comparePrTime
                          ? snipeSegment.prSecondsFromKom
                          : snipeSegment.timeFromKom
                        : comparePrTime
                          ? snipeSegment.prSecondsFromQom
                          : snipeSegment.timeFromQom}
                    </p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        % Off {!leaderTypeQom ? `KOM:` : `QOM:`}
                      </span>
                    </p>
                    <p className="mb-0">
                      {!leaderTypeQom
                        ? comparePrTime
                          ? `${snipeSegment.prPercentageFromKom}%`
                          : `${snipeSegment.percentageFromKom}% `
                        : comparePrTime
                          ? `${snipeSegment.prPercentageFromQom}%`
                          : `${snipeSegment.percentageFromQom}%`}
                    </p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        Athlete Count:
                      </span>
                    </p>
                    <p className="mb-0">{snipeSegment.athleteCount}</p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">
                        Elevation Gain:
                      </span>
                    </p>
                    <p className="mb-0">{snipeSegment.elevation} ft.</p>
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col className="d-flex justify-content-between">
                    <p className="mb-0">
                      <span className="activity-card-label">Heading:</span>
                    </p>
                    <p className="mb-0">{snipeSegment.heading}</p>
                  </Col>
                </Row>
              </Col>
              <Col className="p-0" md={12} lg={6}>
                <ActivityMap
                  stravaMap={snipeSegment.map!}
                  startLatlng={
                    snipeSegment.detailedSegmentEffort?.summarySegment
                      .startLatlng
                  }
                  endLatlng={
                    snipeSegment.detailedSegmentEffort?.summarySegment.endLatlng
                  }
                />
              </Col>
            </Row>
          </Col>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center align-items-center">
          {isLoading ? (
            <Button
              type="submit"
              variant="secondary"
              style={{ width: '175px' }}
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
          ) : (
            <Button
              className="px-4"
              onClick={() => handleStarButtonClick()}
              style={{ width: '175px' }}
            >
              {snipeSegment.starred ? (
                <FontAwesomeIcon icon={solidStar} />
              ) : (
                <FontAwesomeIcon icon={regularStar} />
              )}
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default SnipeSegmentCard;
