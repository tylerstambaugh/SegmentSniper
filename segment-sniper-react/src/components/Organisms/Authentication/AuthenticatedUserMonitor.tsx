import { useEffect, useRef, useState } from 'react';
import useTokenDataStore from '../../../stores/useTokenStore';
import useUserStore from '../../../stores/useUserStore';
import AutoLogoutModal from './AutoLogoutModal/AutoLogoutModal';

export default function AuthenticatedUserMonitor() {
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const userData = useUserStore((state) => state.user);
  const setIsAuthenticated = useTokenDataStore(
    (state) => state.setIsAuthenticated
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showAutoLogoutModal, setShowAutoLogoutModal] = useState(false);

  useEffect(() => {
    // Only run the effect if both accessToken and expiration are available
    if (!tokenData?.accessToken || !tokenData?.expiration) {
      setIsAuthenticated(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(tokenData.expiration!).getTime();

      setShowAutoLogoutModal(expirationTime - currentTime < 1 * 60 * 1000);

      if (
        expirationTime > currentTime &&
        userData !== null
      ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, 10000);

    // Clear interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setIsAuthenticated, tokenData?.accessToken, tokenData?.expiration, userData]);

  return showAutoLogoutModal ? <AutoLogoutModal showModal={true} /> : null;
}
