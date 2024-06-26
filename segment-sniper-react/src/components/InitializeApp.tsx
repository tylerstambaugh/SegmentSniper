import React, { ReactNode, useEffect } from "react";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";
import { CustomToast } from "./Molecules/Toast/CustomToast";

interface InitializeComponentProps {
  children: ReactNode;
}

const InitializeApp: React.FC<InitializeComponentProps> = ({ children }) => {
  const refreshToken = useRefreshTokenQuery();
  const [appConfig, setAppConfig] = useAppConfigStore((state) => [
    state.appConfig,
    state.setAppConfig,
  ]);

  const getClientConfig = useGetClientConfiguration();

  useEffect(() => {
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
            message: "Error fetching app config",
            error: `Error: ${error.message}`,
            type: "error",
          });
        }
      }
    };
    initializeApp();
  }, []);

  return <>{children}</>;
};

export default InitializeApp;
