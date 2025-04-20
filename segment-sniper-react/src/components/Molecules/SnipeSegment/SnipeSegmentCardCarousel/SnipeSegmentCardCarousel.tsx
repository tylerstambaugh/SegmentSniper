import React, { useCallback, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-multi-carousel/lib/styles.css';
import { SnipeSegmentListItem } from '../../../../models/Segment/SnipeSegmentListItem';
import SnipeSegmentCard from '../SnipeSegmentCard/SnipeSegmentCard';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';
import PrevArrow from '../../../Atoms/Slider/PrevArrow';
import NextArrow from '../../../Atoms/Slider/NextArrow';

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
  const [segmentIndex, setSegmentIndex] = useState<number>(carouselIndex ?? 0);

  // const checkScreenSize = useCallback(
  //   debounce(() => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //   }, 200),
  //   []
  // );

  // useEffect(() => {
  //   checkScreenSize();
  //   window.addEventListener('resize', checkScreenSize);
  //   return () => {
  //     window.removeEventListener('resize', checkScreenSize);
  //     checkScreenSize.cancel();
  //   };
  // }, [checkScreenSize]);

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const changeSlide = (previousSlide: number, currentSlide: number, dataSize: number) => {
    let activeSlide = 1
    // right arrow
    if (previousSlide < currentSlide) activeSlide = currentSlide - 2 === dataSize ? 0 : currentSlide - 2
    // left arrow
    else activeSlide = currentSlide + (currentSlide <= dataSize && currentSlide >= 2 ? -2 : dataSize - 2);
    setSegmentIndex(activeSlide)
  }

  return !snipeSegmentIsLoading ? (
    <Col>
      <Row>
        <Col className="p-0">
          <Carousel
            responsive={responsive}
            infinite
            afterChange={(previousSlide, { currentSlide }) => changeSlide(previousSlide, currentSlide, snipeSegmentList.length)}
            arrows={!isSmallScreen}
            swipeable
            draggable
            // customLeftArrow={<PrevArrow />}
            // customRightArrow={<NextArrow />}
            itemClass="carousel-item-padding-40-px"
          >
            {snipeSegmentList.map((segment, index) => (
              <div key={segment.segmentId ?? index}>
                <SnipeSegmentCard
                  snipeSegment={segment}
                  leaderTypeQom={leaderTypeQom}
                />
              </div>
            ))
            }
          </Carousel>
        </Col>
      </Row>
      <Row>
        <h4 className="text-center pt-3 pb-0 mb-0">
          Segment {segmentIndex + 1} of {snipeSegmentList.length}
        </h4>
      </Row>
      <Row>
        <p className="text-center small text-muted p-0 m-0">
          Swipe to see more
        </p>
      </Row>
    </Col>
  ) : null;
};

export default SnipeSegmentCardCarousel;
