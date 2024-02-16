import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import SnipeSegmentCard from "../SnipeSegmentCard/SnipeSegmentCard";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { Button, Col, Row } from "react-bootstrap";

interface SnipeSegmentCardCarouselProps {
  snipeSegmentList: SnipeSegmentListItem[];
  leaderTypeQom: boolean;
  carouselIndex?: number | null;
}

const SnipeSegmentCardCarousel = ({
  snipeSegmentList,
  leaderTypeQom,
  carouselIndex,
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

  const [segmentIndex, setSegmentIndex] = useState<number>(carouselIndex ?? 0);

  const goToPrevSlide = () => {
    setSegmentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : snipeSegmentList.length - 1
    );
  };

  const goToNextSlide = () => {
    setSegmentIndex((prevIndex) =>
      prevIndex < snipeSegmentList.length - 1 ? prevIndex + 1 : 0
    );
  };

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
      <Row className="align-items-center">
        <Col xs={1} className="text-end">
          <Button onClick={goToPrevSlide}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </Button>
        </Col>
        <Col xs={10} className="p-0">
          <Slider
            {...settings}
            beforeChange={(oldIndex, newIndex) => setSegmentIndex(newIndex)}
            className="p-0"
          >
            {snipeSegmentList.map((snipeSegment, index) => (
              <SnipeSegmentCard
                key={uuidv4()}
                snipeSegment={snipeSegment}
                leaderTypeQom={leaderTypeQom}
              />
            ))}
          </Slider>
        </Col>
        <Col xs={1} className="text-start">
          <Button onClick={goToNextSlide}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default SnipeSegmentCardCarousel;
