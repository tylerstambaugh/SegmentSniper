import React, { useCallback, useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-multi-carousel/lib/styles.css';
import { SnipeSegmentListItem } from '../../../../models/Segment/SnipeSegmentListItem';
import SnipeSegmentCard from '../SnipeSegmentCard/SnipeSegmentCard';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row } from 'react-bootstrap';
import PrevArrow from '../../../Atoms/Slider/PrevArrow';
import NextArrow from '../../../Atoms/Slider/NextArrow';
import { debounce } from 'lodash-es';

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

  const carouselRef = useRef<Carousel>(null);

  const checkScreenSize = useCallback(() => {
    const debouncedCheck = debounce(() => {
      setIsSmallScreen(window.innerWidth < 768);
    }, 200);

    debouncedCheck();
    return () => debouncedCheck.cancel();
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [checkScreenSize]);

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
      <Row
        className="d-flex flex-row justify-content-center align-items-center"
      >
        <Col xs={1} className="d-flex justify-content-center ">
          {!isSmallScreen ? (
            <PrevArrow onClick={() => carouselRef.current?.previous(1)} />
          ) : null}
        </Col>
        <Col xs={10} className="px-0">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite
            afterChange={(previousSlide, { currentSlide }) => changeSlide(previousSlide, currentSlide, snipeSegmentList.length)}
            arrows={false}
            swipeable
            draggable
            itemClass="carousel-item-padding-40-px"
          >
            {snipeSegmentList.map((segment, index) => {
              const isVisible = index === segmentIndex;
              return (
                <div key={uuidv4()}>
                  {isVisible ? (
                    <SnipeSegmentCard
                      snipeSegment={segment}
                      leaderTypeQom={leaderTypeQom}
                    />
                  ) : (
                    <div className='my-auto' style={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="text-muted">Loading…</span>
                    </div>
                  )}
                </div>
              )
            })}
          </Carousel>
        </Col>
        <Col xs={1} className="d-flex justify-content-center align-items-center">
          {!isSmallScreen ? (
            <NextArrow onClick={() => {
              console.log("next");
              carouselRef.current?.next(1)
            }} />
          ) : null}
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
