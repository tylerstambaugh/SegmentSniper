import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "../ActivityCard/ActivityCard";
import { Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const ActivityCardCarousel = () => {
  const settings: Settings = {
    dots: false,
    centerMode: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [activityList] = useActivityListStore((state) => [state.activityList]);
  const [activityIndex, setActivityIndex] = useState<number>(0);

  return (
    <>
      {activityList.length > 0 ? (
        <Col>
          <Row className="text-center">
            <p className="p-0 m-0">
              {1 + activityIndex} of {activityList.length}
            </p>
            <p className="p-0 m-0">Swipe to see more</p>
          </Row>
          <Row>
            <Slider
              {...settings}
              afterChange={(index) => setActivityIndex(index)}
            >
              {activityList.map((activity, index) => (
                <ActivityCard
                  key={activity.activityId}
                  activity={activity}
                  showMap={true}
                />
              ))}
            </Slider>
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

export default ActivityCardCarousel;
