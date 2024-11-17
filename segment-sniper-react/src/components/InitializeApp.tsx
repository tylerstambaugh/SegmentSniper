import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";
import { CustomToast } from "./Molecules/Toast/CustomToast";
import useTokenDataStore from "../stores/useTokenStore";

interface InitializeComponentProps {
  children: ReactNode;
}

const InitializeApp: React.FC<InitializeComponentProps> = ({ children }) => {
  const { refetch: refetchToken } = useRefreshTokenQuery();
  const [appConfig, setAppConfig] = useAppConfigStore((state) => [
    state.appConfig,
    state.setAppConfig,
  ]);
  const isAuthenticated = useTokenDataStore((state) => (state.isAuthenticated));

  const getClientConfig = useGetClientConfiguration();
  const location = useLocation();

  // Fetch app configuration on mount
  useEffect(() => {
    console.log("Running initialize app");

    const initializeApp = async () => {
      try {
        const appConfigData = await getClientConfig.mutateAsync();

        setAppConfig({
          clientId: appConfigData?.stravaApiClientId ?? "",
          googleMapsApiKey: appConfigData?.googleMapsApiKey ?? "",
        });
      } catch (error) {
        if (error instanceof Error) {
          CustomToast({
            message: "Error initializing app",
            error: `Error: ${error.message}`,
            type: "error",
          });
        }
      }
    };

    initializeApp();
  }, []);

  // Trigger token refresh on navigation
  useEffect(() => {
    if (isAuthenticated) {
      const refreshTokenOnNavigation = async () => {
        console.log("Route changed, refreshing token... New Location:", location.pathname);
        await refetchToken();
      };

      refreshTokenOnNavigation();
    }
  }, [location, refetchToken, isAuthenticated]);


  return <>{children}</>;
};

export default InitializeApp;
