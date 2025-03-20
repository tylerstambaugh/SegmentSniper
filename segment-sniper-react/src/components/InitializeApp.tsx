import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadScriptNext } from "@react-google-maps/api";
import useAppConfigStore from "../stores/useAppConfigStore";
import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";
import { CustomToast } from "./Molecules/Toast/CustomToast";
import useTokenDataStore from "../stores/useTokenStore";
import { ClientConfigurationResponse } from "../services/Api/getClientConfiguration";

interface InitializeComponentProps {
  children: ReactNode;
}

const InitializeApp: React.FC<InitializeComponentProps> = ({ children }) => {
  const { refetch: refetchToken } = useRefreshTokenQuery();
  const [setAppConfig] = useAppConfigStore((state) => [state.setAppConfig]);
  const googleMapsApiKey = useAppConfigStore((state) => state.appConfig?.googleMapsApiKey);
  const isAuthenticated = useTokenDataStore((state) => state.isAuthenticated);

  const { data: appConfigData, isLoading, isError, error } = useGetClientConfiguration();
  const location = useLocation();
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


  // Fetch app configuration on mount
  // useEffect(() => {
  //   const initializeApp = async () => {
  //     try {
  //       const appConfigData: ClientConfigurationResponse = await getClientConfig.mutateAsync() as ClientConfigurationResponse;

  //       setAppConfig({
  //         clientId: appConfigData?.stravaApiClientId ?? "",
  //         googleMapsApiKey: appConfigData?.googleMapsApiKey ?? "",
  //       });

  //       setApiKeyLoaded(true);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         CustomToast({
  //           message: "Error initializing app",
  //           error: `Error: ${error.message}`,
  //           type: "error",
  //         });
  //       }
  //     }
  //   };

  //   initializeApp();
  // }, []);

  // Trigger token refresh on navigation
  useEffect(() => {
    if (isAuthenticated) {
      const refreshTokenOnNavigation = async () => {
        await refetchToken();
      };

      refreshTokenOnNavigation();
    }
  }, [location, refetchToken, isAuthenticated]);

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


//OLD FILE:
// import React, { ReactNode, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import useAppConfigStore from "../stores/useAppConfigStore";
// import { useGetClientConfiguration } from "../hooks/Api/useGetClientConfiguration";
// import useRefreshTokenQuery from "../hooks/Api/Auth/useRefreshTokenQuery";
// import { CustomToast } from "./Molecules/Toast/CustomToast";
// import useTokenDataStore from "../stores/useTokenStore";

// interface InitializeComponentProps {
//   children: ReactNode;
// }

// const InitializeApp: React.FC<InitializeComponentProps> = ({ children }) => {
//   const { refetch: refetchToken } = useRefreshTokenQuery();
//   const [setAppConfig] = useAppConfigStore((state) => [
//     state.setAppConfig,
//   ]);
//   const isAuthenticated = useTokenDataStore((state) => (state.isAuthenticated));

//   const getClientConfig = useGetClientConfiguration();
//   const location = useLocation();

//   // Fetch app configuration on mount
//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         const appConfigData = await getClientConfig.mutateAsync();

//         setAppConfig({
//           clientId: appConfigData?.stravaApiClientId ?? "",
//           googleMapsApiKey: appConfigData?.googleMapsApiKey ?? "",
//         });
//       } catch (error) {
//         if (error instanceof Error) {
//           CustomToast({
//             message: "Error initializing app",
//             error: `Error: ${error.message}`,
//             type: "error",
//           });
//         }
//       }
//     };

//     initializeApp();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Trigger token refresh on navigation
//   useEffect(() => {
//     if (isAuthenticated) {
//       const refreshTokenOnNavigation = async () => {
//         await refetchToken();
//       };

//       refreshTokenOnNavigation();
//     }
//   }, [location, refetchToken, isAuthenticated]);


//   return <>{children}</>;
// };

// export default InitializeApp;
