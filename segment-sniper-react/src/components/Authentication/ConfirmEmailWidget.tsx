import { Link, useParams } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { AppRoutes } from "../../enums/AppRoutes";
import { useEffect, useState } from "react";
import { useGetSendEmailConfirmation } from "../../hooks/Api/Auth/useGetSendEmailConfirmation";
import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons/faHouseMedicalCircleExclamation";

export default function ConfirmEmailWidget() {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const confirmToken = params.t;
  const [clickedConfirmEmail, setClickedConfirmEmail] = useState(false);
  const confirmEmailQuery = useGetSendEmailConfirmation();

  async function handleClickConfirmEmail() {
    setClickedConfirmEmail(true);
    await confirmEmailQuery.query.refetch();
  }

  useEffect(() => {
    if (confirmToken && confirmToken !== null) {
      const fetchData = async () => {
        console.log("confirmToken=:", confirmToken);

        console.log("need to try and confirm the code");
      };

      fetchData();
    }
  }, [confirmToken]);

  return (
    <>
      {user?.verifiedEmail ? (
        <Container>
          <Row>
            <Col>
              <h4>You're verified, time to start sniping</h4>
              <Link to={`/${AppRoutes.SnipedSegments}`}>
                <Button className="px-4">Snipe!</Button>
              </Link>{" "}
            </Col>
          </Row>
        </Container>
      ) : confirmToken && confirmEmailQuery.query.isLoading ? (
        <Row>
          <Col>
            <h2>Hang tight, we're making sure it's you.</h2>
            <Spinner
              as="span"
              variant="light"
              size="sm"
              role="status"
              aria-hidden="true"
              animation="border"
            />
          </Col>
        </Row>
      ) : confirmEmailQuery.data?.success ? (
        <Container>
          <Row>
            <Col>
              <h4>You're verified, time to start sniping</h4>
              <Link to={`/${AppRoutes.SnipedSegments}`}>
                <Button className="px-4">Snipe!</Button>
              </Link>{" "}
            </Col>
          </Row>
        </Container>
      ) : !clickedConfirmEmail ? (
        <Container>
          <Row>
            <Col>
              <h4>Let's verify your email real quick.</h4>
              <p>
                Click the button below and we'll send you an email with a link
                in it.
              </p>
              <p>
                When you receive the email, click the link to verify your email.
              </p>
              <Button
                className="px-4"
                onClick={() => handleClickConfirmEmail()}
              >
                Verify Email
              </Button>
            </Col>
          </Row>
        </Container>
      ) : clickedConfirmEmail ? (
        <Container>
          <Row>
            <Col>
              <h4>The email has been sent.</h4>
              <p>Click the link in it when you receive it</p>
              <p>
                Be sure to check your spam/junk if you do not receive it soon.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Waited long enough and didn't receive it?</p>
              <Button
                className="px-4"
                onClick={() => handleClickConfirmEmail()}
              >
                Resend
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
