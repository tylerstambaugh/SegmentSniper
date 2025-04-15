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
            infinite
            // afterChange={(previousSlide, { currentSlide }) => {
            //   console.log(`afterChange: ${previousSlide} to ${currentSlide}`)
            //   setActivityIndex(currentSlide)
            //   console.log('activiy index:', activityIndex);

            // }}
            beforeChange={(nextSlide, { currentSlide }) => {
              console.log(`beforeChange: ${nextSlide} to ${currentSlide}`)
              setActivityIndex(currentSlide)
              console.log('beforeChangeactiviy index:', activityIndex);

            }}
            arrows={true}
            swipeable
            draggable
            customLeftArrow={<PrevArrow />}
            customRightArrow={<NextArrow />}
          // itemClass="carousel-item-padding-40-px"
          >

            {activityList.map((activity, index) => {
              console.log('activityList', activityList);

              console.log(`Rendering index ${index}, activityIndex: ${activityIndex}, activityId: ${activity.activityId}`);
              return (
                <ActivityCard
                  key={uuidv4()}
                  activity={activity}
                  isActivitySearchResults={true}
                  mapShown={true}
                />
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
