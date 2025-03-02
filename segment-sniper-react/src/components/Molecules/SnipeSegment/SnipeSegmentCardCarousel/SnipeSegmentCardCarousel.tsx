import React, { useCallback, useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SnipeSegmentListItem } from '../../../../models/Segment/SnipeSegmentListItem';
import SnipeSegmentCard from '../SnipeSegmentCard/SnipeSegmentCard';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';
import PrevArrow from '../../../Atoms/Slider/PrevArrow';
import NextArrow from '../../../Atoms/Slider/NextArrow';
import { debounce } from 'lodash';

interface SnipeSegmentCardCarouselProps {
  snipeSegmentList: SnipeSegmentListItem[];
  snipeSegmentIsLoading: boolean;
  leaderTypeQom: boolean;
  carouselIndex?: number | null;
}

const SnipeSegmentCardCarousel = ({
  snipeSegmentList,
  snipeSegmentIsLoading,
  leaderTypeQom,
  carouselIndex,
}: SnipeSegmentCardCarouselProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const settings: Settings = {
    dots: false,
    centerMode: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isSmallScreen,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

  // const checkScreenSize = useCallback(
  //   debounce(() => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //   }, 200),
  //   []
  // );

  // useEffect(() => {
  //   checkScreenSize();

  //   window.addEventListener("resize", checkScreenSize);

  //   return () => {
  //     window.removeEventListener("resize", checkScreenSize);
  //     checkScreenSize.cancel();
  //   };
  // }, [checkScreenSize]);

  return (
    <>
      {!snipeSegmentIsLoading ? (
        <>
          <Col>
            <Row className="">
              <Col className="p-0">
                <Slider
                  {...settings}
                  beforeChange={(oldIndex, newIndex) =>
                    setSegmentIndex(newIndex)
                  }
                  className="d-flex"
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
            </Row>
            <Row>
              <h4 className="text-center pt-3 pb-0 mb-0">
                Segment {1 + segmentIndex} of {snipeSegmentList.length}
              </h4>
            </Row>
            <Row>
              <p className="text-center small text-muted p-0 m-0">
                Swipe to see more
              </p>
            </Row>
          </Col>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SnipeSegmentCardCarousel;
