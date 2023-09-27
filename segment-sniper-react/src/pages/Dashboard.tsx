import { Col, Container, Row } from "react-bootstrap";
import useUserStore from "../store/useUserStore";
import MainMenu from "../components/MainMenu";
import ConnectWithStrava from "../components/ConnectWithStrava";
import { useGetUserHasStravaToken } from "../hooks/Api/Token/useGetHasStravaToken";
import { useEffect } from "react";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);  
  const checkUserHasTokenData = useGetUserHasStravaToken();

  async function checkUserHasTokenDataFunc() {
    await checkUserHasTokenData.mutateAsync();
  }

  useEffect(() => {
    checkUserHasTokenDataFunc();
  }, [])
  

  return (
    <>
      <h3>the "dashboard"</h3>
      <Container
        className="d-flex flex-column justify-content-center mb-2 bg-light text-dark border rounded mx-auto "
        style={{ width: "50%" }}
      >
        {user?.hasStravaTokenData ? (
          <Row>
            <Col>
              <MainMenu />
            </Col>
          </Row>
        ) : (
          <ConnectWithStrava />
        )}
      </Container>
    </>
  );
}
