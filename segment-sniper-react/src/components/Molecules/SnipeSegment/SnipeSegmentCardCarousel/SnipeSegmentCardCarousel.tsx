import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import SnipeSegmentCard from "../SnipeSegmentCard/SnipeSegmentCard";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";

interface SnipeSegmentCardCarouselProps {
  snipeSegmentList: SnipeSegmentListItem[];
  leaderTypeQom: boolean;
}

const SnipeSegmentCardCarousel = ({
  snipeSegmentList,
  leaderTypeQom,
}: SnipeSegmentCardCarouselProps) => {
  const settings: Settings = {
    dots: false,
    centerMode: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [segmentIndex, setSegmentIndex] = useState<number>(0);

  return (
    <Col>
      <div className="text-center pt-2">
        <Row>
          <h4 className="pb-0 mb-0">
            Segment {1 + segmentIndex} of {snipeSegmentList.length}
          </h4>
        </Row>
        <Row>
          <p className="small text-muted p-0 m-0">Swipe to see more</p>
        </Row>
      </div>
      <Row>
        <Slider
          {...settings}
          beforeChange={(oldIndex, newIndex) => setSegmentIndex(newIndex)}
        >
          {snipeSegmentList.map((snipeSegment, index) => (
            <>
              <SnipeSegmentCard
                key={uuidv4()}
                snipeSegment={snipeSegment}
                leaderTypeQom={leaderTypeQom}
              />
              <p className="text-center">
                {1 + index} of {snipeSegmentList.length}
              </p>
            </>
          ))}
        </Slider>
      </Row>
    </Col>
  );
};

export default SnipeSegmentCardCarousel;
