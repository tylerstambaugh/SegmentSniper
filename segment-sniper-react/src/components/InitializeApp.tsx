import React, { ReactNode, useEffect } from "react";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";
import toast from "react-hot-toast";

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
        toast.error(`Error fetching app config: ${error}`);
      }
    };
    initializeApp();
  }, [setAppConfig]);

  return <>{children}</>;
};

export default InitializeApp;
