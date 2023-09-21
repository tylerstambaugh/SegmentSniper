import React, { useEffect } from "react";
import useAppConfigStore from "../store/useAppConfigStore";

interface Props {
  clientId: string;
}

export default function InitializeApp({ clientId }: Props) {
  const setAppConfig = useAppConfigStore((state) => state.setAppConfig);

  useEffect(() => {
    setAppConfig({ clientId });
  }, [clientId, setAppConfig]);

  return null;
}
