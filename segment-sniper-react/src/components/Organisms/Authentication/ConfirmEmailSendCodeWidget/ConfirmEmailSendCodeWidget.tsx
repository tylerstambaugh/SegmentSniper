import { Link } from "react-router-dom";
import useUserStore from "../../../../stores/useUserStore";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AppRoutes } from "../../../../enums/AppRoutes";
import { useState } from "react";
import { usePostSendEmailConfirmation } from "../../../../hooks/Api/Auth/usePostSendEmailConfirmation";
import useTokenDataStore from "../../../../stores/useTokenStore";
import { SendEmailConfirmationCodeRequest } from "../../../../services/Api/Auth/postSendEmailConfirmationCode";

export default function ConfirmEmailSendCodeWidget() {
  const user = useUserStore((state) => state.user);
  const [clickedConfirmEmail, setClickedConfirmEmail] = useState(false);
  const [resentEmail, setResentEmail] = useState(false);

  const tokenData = useTokenDataStore((state) => state.tokenData);
  const sendEmail = usePostSendEmailConfirmation();

  async function handleClickConfirmEmail() {
    setClickedConfirmEmail(true);
    const request: SendEmailConfirmationCodeRequest = {
      accessToken: tokenData?.accessToken ?? "",
      refreshToken: tokenData?.refreshToken ?? "",
    };
    await sendEmail.mutateAsync(request);
  }

  return (
    <>
      {user?.verifiedEmail ? (
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={6} xs={10}>
              <Card>
                <Row>
                  <Col>
                    <h4>You're verified, time to start sniping</h4>
                    <Link to={`/${AppRoutes.SnipedSegments}`}>
                      <Button className="px-4">Snipe!</Button>
                    </Link>{" "}
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : !clickedConfirmEmail ? (
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            <Col md={6} lg={6} xs={10}>
              <Card className="p-3">
                <Row className="justify-content-center text-center">
                  <Col>
                    <h4>Let's verify your email real quick.</h4>
                    <p>
                      Click the button below and we'll send you an email with a
                      link in it.
                    </p>
                    <p>
                      When you receive the email, click the link to verify your
                      email.
                    </p>
                    <Button
                      className="px-4"
                      onClick={() => handleClickConfirmEmail()}
                    >
                      Verify Email
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : clickedConfirmEmail ? (
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={6} xs={10}>
              <Card>
                <Row className="justify-content-center text-center">
                  <Col>
                    <h4>The email has been sent.</h4>
                    <p>Click the link in it when you receive it</p>
                    <p>
                      Be sure to check your spam/junk if you do not receive it
                      soon.
                    </p>
                  </Col>
                </Row>
                {!resentEmail ? (
                  <Row className="justify-content-center text-center">
                    <Col>
                      <p>Waited long enough and didn't receive it?</p>

                      {sendEmail.isPending ? (
                        <Button
                          type="submit"
                          variant="secondary"
                          className={"px-4"}
                        >
                          <Spinner
                            as="span"
                            variant="light"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"
                          />
                        </Button>
                      ) : (
                        <Button
                          className="px-4"
                          onClick={() => {
                            handleClickConfirmEmail();
                            setResentEmail(true);
                          }}
                        >
                          Resend
                        </Button>
                      )}
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
