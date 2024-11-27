import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import useTokenDataStore from "../../../../stores/useTokenStore";
import useRefreshTokenQuery from "../../../../hooks/Api/Auth/useRefreshTokenQuery";
import { useGetLogout } from "../../../../hooks/Api/Auth/useGetLogout";
import { useResetAllStores } from "../../../../hooks/resetAllStores";
import { CustomToast } from "../../../Molecules/Toast/CustomToast";

type AutoLogoutModalProps = {
  showModal: boolean;
};

export default function AutoLogoutModal({ showModal }: AutoLogoutModalProps) {
  const [show, setShow] = useState(showModal);
  const navigate = useNavigate();
  const tokenExpiration = useTokenDataStore(
    (state) => state.tokenData?.expiration
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentTime = new Date().getTime();
  const expirationTime = new Date(tokenExpiration || "").getTime();
  const timeRemaining = expirationTime - currentTime;
  const [timer, setTimer] = useState(Math.floor(timeRemaining / 1000));
  const { refetch: refetchToken } = useRefreshTokenQuery();
  const logout = useGetLogout();
  const resetAllStores = useResetAllStores();

  const handleClose = async () => { setShow(false), await refetchToken(); };
  const handleLogoutButton = () => {
    handleClose();
    navigate(`/${AppRoutes.Logout}`);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(timeRemaining - 1000);
    }, 1000);

    if (timeRemaining <= 0) {
      clearInterval(intervalRef.current!);
      const revokeTokenAsync = async () => {
        try {
          await logout.mutateAsync().then(() =>
            resetAllStores()
          );
        } catch (error) {
          if (logout.error instanceof Error) {
            CustomToast({
              message: "Error logging out",
              error: `Error: ${logout.error.message}`,
              type: "error",
            });
          }
        }
      };

      revokeTokenAsync().then(() => {
        navigate(`/${AppRoutes.InactiveLogout}`)
        setShow(false);
      });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  const minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const formattedMinutes =
    minutesRemaining < 10 ? `0${minutesRemaining}` : minutesRemaining;
  const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  const formattedSeconds =
    secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;

  return show ? (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Still there?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            {`You have been inactive for a while. For security reasons, you will
            be logged out in ${formattedMinutes}:${formattedSeconds}`}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleLogoutButton()}>
            Logout Now
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Stay Logged In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}
