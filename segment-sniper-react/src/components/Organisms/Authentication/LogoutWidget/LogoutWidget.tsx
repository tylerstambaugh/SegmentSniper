import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useUserStore from "../../../../stores/useUserStore";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import { useEffect } from "react";
import { useResetAllStores } from "../../../../hooks/resetAllStores";
import useTokenDataStore from "../../../../stores/useTokenStore";
import { useGetLogout } from "../../../../hooks/Api/Auth/useGetLogout";
import { CustomToast } from "../../../Molecules/Toast/CustomToast";

export default function LogoutWidget({ inactive }: { inactive: boolean }) {
  const logout = useGetLogout();
  const resetAllStores = useResetAllStores();

  const tokenData = useTokenDataStore((state) => state.tokenData);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const revokeTokenAsync = async () => {
      try {
        if (logout.data !== null) {
          resetAllStores()
        } else {
          await logout.refetch();
        }
      }

      catch (error) {
        if (logout.error instanceof Error) {
          CustomToast({
            message: "Error logging out",
            error: `Error: ${logout.error.message}`,
            type: "error",
          });
        }
      }
    };

    revokeTokenAsync();
  }, [logout, resetAllStores]);

  return (
    <>
      {tokenData === null && user === null ? (
        <Row className="d-flex justify-content-center mt-5">
          <Col md={6} lg={5} xs={10}>
            <div className="border "></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 text-center">
                  {inactive ? (
                    <h2>You have been logged out due to inactivity.</h2>
                  ) : (
                    <h2>You have successfully logged out. </h2>
                  )}
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
