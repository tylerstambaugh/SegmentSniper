import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "../ActivityCard/ActivityCard";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import NextArrow from "../../../Atoms/Slider/NextArrow";
import PrevArrow from "../../../Atoms/Slider/PrevArrow";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { v4 as uuidv4 } from 'uuid';

const ActivityCardCarousel = () => {
  const [activityList] = useActivityListStore((state) => [state.activityList]);
  const [activityIndex, setActivityIndex] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  // const checkScreenSize = useCallback(
  //   debounce(() => {
  //     setIsSmallScreen(window.innerWidth < 768);
  //   }, 200),
  //   []

  // );

  // useEffect(() => {
  //   // if (typeof window === "undefined") return;
  //   checkScreenSize();
  //   console.log("checking screen size");


  //   window.addEventListener("resize", checkScreenSize);

  //   return () => {
  //     window.removeEventListener("resize", checkScreenSize);
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
          <Carousel
            responsive={responsive}
            infinite={true}
            afterChange={(previousSlide, { currentSlide }) => changeSlide(previousSlide, currentSlide, activityList.length)}

            arrows={true}
            swipeable
            draggable
            customLeftArrow={<PrevArrow />}
            customRightArrow={<NextArrow />}
            itemClass="carousel-item-padding-40-px"
          >

            {activityList.map((activity, index) => {
              const isVisible = index === activityIndex;
              console.log(`Rendering index ${index}, activityIndex: ${activityIndex}, activityId: ${activity.activityId}`);
              return (
                <div key={activity.activityId}>
                  {isVisible ? (
                    <ActivityCard
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
