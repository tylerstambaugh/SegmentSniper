import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useUserStore from "../../../../stores/useUserStore";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import { useEffect } from "react";
import { useResetAllStores } from "../../../../hooks/resetAllStores";
import useTokenDataStore from "../../../../stores/useTokenStore";
import { useGetLogout } from "../../../../hooks/Api/Auth/useGetLogout";
import toast from "react-hot-toast";

export default function LogoutWidget() {
  const logout = useGetLogout();
  const resetAllStores = useResetAllStores();

  const tokenData = useTokenDataStore((state) => state.tokenData);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const revokeTokenAsync = async () => {
      try {
        await logout.mutateAsync();
        resetAllStores();
      } catch (error) {
        toast.error(`Error revoking user token:${error} `);
      }
    };

    revokeTokenAsync();
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
                    <Link to={`/${AppRoutes.Login}`}>
                      <Button className="px-4">Login</Button>
                    </Link>{" "}
                  </h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Container>
          <Row>
            <Col>Logging out...</Col>
          </Row>
        </Container>
      )}
    </>
  );
}
