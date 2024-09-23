import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faCrosshairs,
  faListAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import activityLookup from "../assets/images/about/activity_lookup_img.png";
import snipeOptions from "../assets/images/about/snipe_options.png";
import searchResults from "../assets/images/about/search_results_img.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function About() {
  const navigate = useNavigate();
  return (
    <Col className="px-2">
      <Row>
        <Col className="text-center pt-1">
          <h4>What is a Segment Sniper?</h4>
        </Col>
      </Row>
      <Row className="pt-2 mx-2 justify-content-around">
        <Col lg={9}>
          <Card>
            <Card.Title
              className="text-center pt-1 pb-0 activity-card-heading"
              style={{ background: "azure" }}
            >
              <p>For those determined to be the leader</p>
            </Card.Title>
            <Card.Body className="pt-0 mt-0">
              <p>
                The Segment Sniper was designed to be used after an activity has
                been uploaded to Strava, to provide quick analysis and
                additional insights into the performance on the segments of the
                route.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-2 mx-2 justify-content-around">
        <Col lg={9}>
          <Card>
            <Card.Title
              className="text-center pt-1 activity-card-heading"
              style={{ background: "azure" }}
            >
              <span className="d-flex justify-content-center align-items-center">
                <p>It starts with a simple search </p>{" "}
                <FontAwesomeIcon icon={faSearch} className="pb-2 ps-2" />
              </span>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6} className="d-flex mx-auto ">
                  <p>
                    First thing, we need to find the activity that has the
                    segments you want to snipe. Simply search by the activity
                    name, and/or the start and end dates in which the activity
                    occurred. You can also specify the type of activity you wish
                    to snipe.
                  </p>
                </Col>
                <Col className="d-flex justify-content-center">
                  <img
                    src={activityLookup}
                    alt="activityLookup"
                    className="justify-content-center mx-auto"
                    style={{ height: "200px", width: "auto" }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-2 mx-2 justify-content-around">
        <Col lg={9}>
          <Card>
            <Card.Title
              className="text-center pt-1 activity-card-heading"
              style={{ background: "azure" }}
            >
              <span className="d-flex justify-content-center align-items-center">
                <p>Results matter </p>{" "}
                <FontAwesomeIcon icon={faListAlt} className="pb-3 ps-2" />
              </span>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6} className="d-flex mx-auto ">
                  <p>
                    We'll query your Strava data for activities matching the
                    search parameters you provided. On the results page, we list
                    a brief summary of the activity along with the map. When
                    you've found the right acitivty press 'Snipe!'.
                  </p>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Zoom zoomMargin={2}>
                    <img
                      src={searchResults}
                      alt="searchResults"
                      className="justify-content-center mx-auto"
                      style={{ height: "200px", width: "auto" }}
                    />
                  </Zoom>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-2 mx-2 justify-content-around">
        <Col lg={9}>
          <Card>
            <Card.Title
              className="text-center pt-1 activity-card-heading"
              style={{ background: "azure" }}
            >
              <span className="d-flex justify-content-center align-items-center">
                <p>Put em in your sights </p>{" "}
                <FontAwesomeIcon icon={faCrosshairs} className="pb-3 ps-2" />
              </span>
            </Card.Title>
            <Card.Body>
              <Row>
                <Col md={6} className="d-flex mx-auto ">
                  <p>
                    With the activity selected, now it's time to find the
                    segments for you to crush. The 'Snipe Options' pane lists a
                    number of filters that can be applied to the list of
                    segments in the activity. Setting the filters will
                    auto-update the list of segments to those matching the
                    criteria. If you want to find segments where you are a
                    certain number of seconds off of the leader, use the
                    'Seconds From' filter. Same thing applies if you want to
                    look for segments where you are a percentage from the
                    leader. If you want to look for the help of a tailwind,
                    filter the list further by using the 'Heading' option. The
                    matching segments appear below the filters and include an
                    option to Star them so you can track them or use Strava Live
                    Segments on a compatible device.
                  </p>
                </Col>
                <Col className="d-flex justify-content-center">
                  <Zoom zoomMargin={2}>
                    <img
                      src={snipeOptions}
                      alt="snipeOptions"
                      className="justify-content-center mx-auto"
                      style={{ height: "190px", width: "auto" }}
                    />
                  </Zoom>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}
export default About;
