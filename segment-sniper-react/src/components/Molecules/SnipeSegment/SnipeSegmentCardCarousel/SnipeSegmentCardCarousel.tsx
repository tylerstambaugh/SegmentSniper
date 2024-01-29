import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import SnipeSegmentCard from "../SnipeSegmentCard/SnipeSegmentCard";
import { v4 as uuidv4 } from "uuid";

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

  return (
    <Slider {...settings}>
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
  );
};

export default SnipeSegmentCardCarousel;
