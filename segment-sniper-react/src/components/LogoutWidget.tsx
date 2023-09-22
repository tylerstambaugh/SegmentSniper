import { Button } from "react-bootstrap";
import useTokenDataStore from "../store/useTokenStore";
import useUserStore from "../store/useUserStore";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import { useEffect } from "react";

export default function LogoutWidget() {
  const [tokenData, setTokenData] = useTokenDataStore((state) => [
    state.tokenData,
    state.setTokenData,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  useEffect(() => {
    setUser(null);
    setTokenData(null);
  }, []);

  return (
    <>
      {tokenData === null && user === null ? (
        <>
          <h2>
            You have successfully logged out. Click{" "}
            <Link to={AppRoutes.Login}>
              <Button>here</Button>
            </Link>
            to log back in.
          </h2>
        </>
      ) : (
        <>
          <h2>There was an issue logging out. Dangit.</h2>
        </>
      )}
    </>
  );
}
