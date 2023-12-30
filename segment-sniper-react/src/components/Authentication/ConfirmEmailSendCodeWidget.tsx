import { Link, useParams } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { AppRoutes } from "../../enums/AppRoutes";
import { useEffect, useState } from "react";
import { usePostSendEmailConfirmation } from "../../hooks/Api/Auth/usePostSendEmailConfirmation";
import useTokenDataStore from "../../stores/useTokenStore";
import { SendEmailConfirmationCodeRequest } from "../../services/Api/Auth/postSendEmailConfirmationCode";

export default function ConfirmEmailSendCodeWidget() {
  const user = useUserStore((state) => state.user);
  const [clickedConfirmEmail, setClickedConfirmEmail] = useState(false);

  const tokenData = useTokenDataStore((state) => state.tokenData);
  const sendEmail = usePostSendEmailConfirmation();

  async function handleClickConfirmEmail() {
    setClickedConfirmEmail(true);
    let request: SendEmailConfirmationCodeRequest = {
      accessToken: tokenData?.accessToken!,
      refreshToken: tokenData?.refreshToken!,
    };
    await sendEmail.mutateAsync(request);
  }

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
