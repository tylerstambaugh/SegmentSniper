import { Card, Col, Row } from 'react-bootstrap';
import { usePostStarSegment } from '../../../hooks/Api/Segments/usePostStarSegment';
import { SegmentDetails } from '../../../models/Segment/SegmentDetails';
import { CustomToast } from '../Toast/CustomToast';
import ActivityMap from '../Activity/ActivityMap/ActivityMap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type SegmentDetailsCardProps = {
  segmentDetails?: SegmentDetails;
};

//segment Id: 27775517
const SegmentDetailsCard = ({ segmentDetails }: SegmentDetailsCardProps) => {
  const starSegment = usePostStarSegment();
  const segmentBaseUrl = 'https://www.strava.com/segments/';
  async function handleStarButtonClick() {
    if (segmentDetails) {
      try {
        const response = await starSegment.mutateAsync({
          segmentId: segmentDetails.segmentId!,
          star: !segmentDetails.starred,
        });

        if (
          !starSegment.isError &&
          !starSegment.isPending &&
          response !== null
        ) {
          segmentDetails.starred = true;
        }
      } catch (error) {
        if (starSegment.error instanceof Error) {
          CustomToast({
            message: 'Star failed',
            error: `Error: ${starSegment.error.message}`,
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
  }

  return (
    <>
      {segmentDetails ? (
        <Row className="d-flex justify-content-center pt-3">
          <Col md={6} xs={10}>
            <Card className="shadow">
              <Card.Title className="pt-3">
                <Col className="d-flex justify-content-center ">
                  <Row>
                    <Col>{segmentDetails.name}</Col>
                  </Row>
                </Col>
                <hr className="hr-75" />
              </Card.Title>
              <Card.Body className="py-2">
                <Col>
                  <Row>
                    <Col className="p-3" md={12} lg={6}>
                      <Row className="justify-content-start text-start">
                        <Col className="d-flex justify-content-between">
                          <p className="mb-0">
                            <span className="activity-card-label">
                              Distance:
                            </span>{' '}
                          </p>
                          <p className="mb-0">{segmentDetails.distance} mi.</p>
                        </Col>
                      </Row>
                      <Row className="justify-content-start text-start">
                        <Col className="d-flex justify-content-between">
                          <p className="mb-0">
                            <span className="activity-card-label">
                              Average Grade:
                            </span>{' '}
                          </p>
                          <p className="mb-0">
                            {segmentDetails.averageGrade}%
                          </p>
                        </Col>
                      </Row>
                      <Row className="justify-content-start text-start">
                        <Col className="d-flex justify-content-between">
                          <p className="mb-0">
                            <span className="activity-card-label">Kom:</span>{' '}
                          </p>
                          <p className="mb-0">
                            {segmentDetails.xoms.komTime}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="p-3" md={12} lg={6}>
                      <Row className="justify-content-start text-start">
                        <Col className="d-flex justify-content-between">
                          <p className="mb-0">
                            <Link
                              to={`${segmentBaseUrl}/${segmentDetails.segmentId}`}
                              target='_blank'
                            >
                              View on Strava
                              <FontAwesomeIcon
                                icon={faUpRightFromSquare}
                                size="sm"
                                style={{
                                  color: '#ffca14',
                                  paddingTop: '.6rem',
                                  font: 'black',
                                }}
                              />
                            </Link>
                          </p>
                          <p className="mb-0">
                            {segmentDetails.xoms.komTime}
                          </p>
                        </Col>
                      </Row>
                    </Col>

                    <Col className="p-0" md={12} lg={6}>
                      <ActivityMap
                        stravaMap={segmentDetails.map!}
                        startLatlng={segmentDetails.startLatlng}
                        endLatlng={segmentDetails.endLatlng}
                      />
                    </Col>
                  </Row>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="d-flex justify-content-center pt-3 ">
          <Col md={6} xs={10}>
            <Card className="shadow">
              <Card.Title className="d-flex justify-content-center pt-2">
                <Row>
                  <Col>Segment Details</Col>
                </Row>
              </Card.Title>
              <Card.Body>
                <Row>
                  <Col>No Segment Selected</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SegmentDetailsCard;
