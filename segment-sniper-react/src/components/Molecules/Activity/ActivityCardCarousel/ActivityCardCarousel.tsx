import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "../ActivityCard/ActivityCard";
import { Col, Container, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import NextArrow from "../../../Atoms/Slider/NextArrow";
import PrevArrow from "../../../Atoms/Slider/PrevArrow";
import { debounce } from "lodash";
import React from "react";

const ActivityCardCarousel = () => {
  const [activityList] = useActivityListStore((state) => [state.activityList]);
  const [activityIndex, setActivityIndex] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const settings: Settings = {
    dots: false,
    centerMode: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,

    className: "slider-container",
  };


  const checkScreenSize = useCallback(
    debounce(() => {
      setIsSmallScreen(window.innerWidth < 768);
    }, 200),
    []

  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    checkScreenSize();
    console.log("checking screen size");


    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      checkScreenSize.cancel();
    };
  }, [checkScreenSize]);


  return (
    <>
      {activityList.length > 0 ? (
        <Col>
          <div className="text-center pt-2">
            <Row>
              <h4 className="pb-0 mb-0">
                {1 + activityIndex}\{activityList.length}
              </h4>
            </Row>
            <Row>
              <p className="small text-muted p-0 m-0">Swipe to see more</p>
            </Row>
          </div>
          <Row>
            <Col>
              <Slider
                {...settings}
                beforeChange={(oldIndex, newIndex) => {
                  setActivityIndex(() => newIndex);
                }
                }
                className={
                  activityList.length > 1 ? "d-flex px-3" : "d-inline px-3"
                }
              >
                {activityList.map((activity, index) => {
                  console.log(`Rendering index ${index}, activityIndex: ${activityIndex}, activityId: ${activity.activityId}`);

                  return index === activityIndex ? (
                    <ActivityCard
                      key={activity.activityId}
                      activity={activity}
                      isActivitySearchResults={true}
                      mapShown={true}
                    />
                  ) : null;
                })}
              </Slider>
            </Col>
          </Row>
        </Col>
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
