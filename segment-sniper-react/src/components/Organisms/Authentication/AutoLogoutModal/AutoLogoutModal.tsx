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
  const expirationTime = new Date(tokenExpiration || "").getTime();
  const [timer, setTimer] = useState(
    Math.floor((expirationTime - Date.now()) / 1000)
  );
  const { refetch: refetchToken } = useRefreshTokenQuery();
  const logout = useGetLogout();
  const resetAllStores = useResetAllStores();
  const logoutCalledRef = useRef(false); // Track if logout has already been triggered

  const handleClose = async () => {
    setShow(false);
    clearInterval(intervalRef.current!);
    await refetchToken();
  };

  const handleLogoutButton = () => {
    handleClose();
    navigate(`/${AppRoutes.Logout}`);
  };

  useEffect(() => {

    if (timer <= 0) {
      // Clear the interval and handle logout when timer reaches 0
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (!logoutCalledRef.current) {
        logoutCalledRef.current = true; // Set the flag to prevent multiple calls

        const revokeTokenAsync = async () => {
          try {
            await logout.refetch().then(() => {
              resetAllStores();
              navigate(`/${AppRoutes.InactiveLogout}`);
              setShow(false)
            });
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

        revokeTokenAsync();
      }

      return; // Exit the effect early to avoid setting up the interval again.
    }

    intervalRef.current = setInterval(() => {
      const newTimer = Math.max(timer - 1, 0);
      setTimer((prev) => Math.max(prev - 1, 0)); // Prevent timer from going below 0
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer]); // Keep only the necessary dependencies

  const minutesRemaining = Math.floor(timer / 60);
  const formattedMinutes =
    minutesRemaining < 10 ? `0${minutesRemaining}` : minutesRemaining;
  const secondsRemaining = timer % 60;
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
