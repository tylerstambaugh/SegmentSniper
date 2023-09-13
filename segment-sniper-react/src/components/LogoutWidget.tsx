import { Button } from "react-bootstrap";
import useTokenDataStore from "../store/useTokenStore";
import useUserStore from "../store/useUserStore";
import { Link } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";

export default function LoginWidget() {
  const [tokenData, setTokenData] = useTokenDataStore((state) => [
    state.tokenData,
    state.setTokenData,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  setUser(null);
  setTokenData(null);

  if (tokenData === null && user === null) {
    return (
      <>
        <h2>
          You have successfully logged out. Click{" "}
          <Link to={AppRoutes.Login}>
            <Button>here</Button>
          </Link>
          to log back in.
        </h2>
      </>
    );
  }
}
