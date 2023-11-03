import { Button, Card, Col, Row } from "react-bootstrap";
import useUserStore from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import { useEffect } from "react";
import { useResetAllStores } from "../../hooks/resetAllStores";
import useTokenDataStore from "../../stores/useTokenStore";

export default function LogoutWidget() {
  const resetAllStores = useResetAllStores();

  const tokenData = useTokenDataStore((state) => state.tokenData);
  const user = useUserStore((state) => state.user);

  //need to call the api and revoke the token
  useEffect(() => {
    resetAllStores();
  }, []);

  return (
    <>
      {tokenData === null && user === null ? (
        <Row className="vh-100 d-flex justify-content-center mt-5">
          <Col md={6} lg={5} xs={10}>
            <div className="border "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 text-center">
                  <h2>You have successfully logged out. </h2>
                  <h3>
                    Click{" "}
                    <Link to={AppRoutes.Login}>
                      <Button>here </Button>
                    </Link>{" "}
                    to log back in.
                  </h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <h2>There was an issue logging out. Dangit.</h2>
        </>
      )}
    </>
  );
}
