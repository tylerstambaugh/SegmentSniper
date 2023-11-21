import React, { useEffect } from "react";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";

export default function InitializeApp() {
  //useRefreshTokenQuery();
  const [appConfig, setAppConfig] = useAppConfigStore((state) => [
    state.appConfig,
    state.setAppConfig,
  ]);

  const getClientConfig = useGetClientConfiguration();

  useEffect(() => {
    if (getClientConfig.data) {
      setAppConfig({
        clientId: getClientConfig.data.stravaApiClientId,
        googleMapsApiKey: getClientConfig.data.googleMapsApiKey,
      });
    }
  }, [getClientConfig.data, setAppConfig]);

  return null;
}
