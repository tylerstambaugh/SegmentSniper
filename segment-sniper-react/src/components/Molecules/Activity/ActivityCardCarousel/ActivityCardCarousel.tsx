import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "../ActivityCard/ActivityCard";
import { Col, Container, Row } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from "lodash-es";
import NextArrow from "../../../Atoms/Slider/NextArrow";
import PrevArrow from "../../../Atoms/Slider/PrevArrow";

const ActivityCardCarousel = () => {
  const [activityList] = useActivityListStore((state) => [state.activityList]);
  const [activityIndex, setActivityIndex] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const carouselRef = useRef<Carousel>(null);
  const checkScreenSize = useCallback(
    debounce(() => {
      setIsSmallScreen(window.innerWidth < 768);
    }, 200),
    []

  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    checkScreenSize();


    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      checkScreenSize.cancel();
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
    setActivityIndex(activeSlide)
  }

  return (
    <>
      {activityList.length > 0 ? (
        <Col>
          <div className="text-center pt-2">
            <Row>
              <h4 className="pb-0 mb-0">
                {activityIndex + 1}\{activityList.length}
              </h4>
            </Row>
            <Row>
              <p className="small text-muted p-0 m-0">Swipe to see more</p>
            </Row>
          </div>
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
                infinite={true}
                afterChange={(previousSlide, { currentSlide }) => changeSlide(previousSlide, currentSlide, activityList.length)}
                arrows={!!isSmallScreen}
                swipeable
                draggable
                itemClass="carousel-item-padding-40-px"
              >

                {activityList.map((activity, index) => {
                  const isVisible = index === activityIndex;
                  return (
                    <div key={uuidv4()}>
                      {isVisible ? (
                        <ActivityCard
                          key={uuidv4()}
                          activity={activity}
                          isActivitySearchResults={true}
                          mapShown={true}
                        />
                      ) : (
                        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        </Col >
      ) : (
        <Container>
          <Row>
            <Col className=" d-flex justify-content-center pt-4">
              <h4>0 Results Found</h4>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default React.memo(ActivityCardCarousel);
