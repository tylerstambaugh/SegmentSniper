import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadScriptNext } from "@react-google-maps/api";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
import { CustomToast } from "./Molecules/Toast/CustomToast";

interface InitializeComponentProps {
  children: ReactNode;
}

const InitializeApp: React.FC<InitializeComponentProps> = ({ children }) => {
  const [setAppConfig] = useAppConfigStore((state) => [state.setAppConfig]);
  const googleMapsApiKey = useAppConfigStore((state) => state.appConfig?.googleMapsApiKey);


  const { data: appConfigData, isLoading, isError, error } = useGetClientConfiguration();
  const [apiKeyLoaded, setApiKeyLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      if (isLoading) return; // Don't proceed while loading
      if (isError && error instanceof Error) {
        CustomToast({
          message: "Error initializing app",
          error: `Error: ${error.message}`,
          type: "error",
        });
        return;
      }

      if (appConfigData) {
        setAppConfig({
          clientId: appConfigData?.stravaApiClientId ?? "",
          googleMapsApiKey: appConfigData?.googleMapsApiKey ?? "",
        });
        setApiKeyLoaded(true);
      }
    };

    initializeApp();
  }, [isLoading, isError, error, appConfigData, setAppConfig]);

  if (!apiKeyLoaded) {
    return null; // Prevent rendering until API key is available
  }

  return (
    <LoadScriptNext googleMapsApiKey={googleMapsApiKey || ""}>
      <>
        {children}
      </>
    </LoadScriptNext>
  );
};

export default InitializeApp;
