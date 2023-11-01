import React, { useEffect } from "react";
import useAppConfigStore from "../stores/useAppConfigStore";
import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";

interface Props {
  clientId: string;
}

export default function InitializeApp({ clientId }: Props) {
  useRefreshTokenQuery();
  const setAppConfig = useAppConfigStore((state) => state.setAppConfig);

  useEffect(() => {
    setAppConfig({ clientId });
  }, [clientId, setAppConfig]);

  return null;
}
