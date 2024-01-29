import { Container, Row, Col, Spinner } from "react-bootstrap";
import SnipeSegmentCard from "../SnipeSegmentCard/SnipeSegmentCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import SnipeSegmentCardCarousel from "../SnipeSegmentCardCarousel/SnipeSegmentCardCarousel";

interface SnipeSegmentCardListProps {
  snipeListLoading: boolean;
  filtering: boolean;
  segmentList: SnipeSegmentListItem[];
  leaderTypeQom: boolean;
}

const SnipeSegmentsCardList = ({
  snipeListLoading,
  filtering,
  segmentList,
  leaderTypeQom,
}: SnipeSegmentCardListProps) => {
  return (
    <>
      {!snipeListLoading && segmentList ? (
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <h4>Segments: {segmentList.length}</h4>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        {snipeListLoading || filtering ? (
          <Col className="text-center pt-3">
            <span>Hang tight, we're working on it</span> <br />
            <Spinner
              as="span"
              variant="secondary"
              role="status"
              aria-hidden="true"
              animation="border"
              className="custom=spinner"
            />
          </Col>
        ) : (
          <></>
        )}
      </Row>
      {segmentList.length === 0 && !snipeListLoading && !filtering ? (
        <Container fluid>
          <Row className="align-items-center justify-content-center">
            <Col className="text-center">
              <h4>No Segments to Snipe</h4>
            </Col>
          </Row>
        </Container>
      ) : (
        <Row>
          <Col>
            <SnipeSegmentCardCarousel
              snipeSegmentList={segmentList}
              leaderTypeQom={leaderTypeQom}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default SnipeSegmentsCardList;
