import { useQuery } from "@tanstack/react-query";
import useTokenDataStore from "../../../stores/useTokenStore";
import { useEffect } from "react";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import postRefreshToken from "../../../services/Api/Auth/postRefreshToken";

const useRefreshTokenQuery = () => {
  const [tokenData, setTokenData] = useTokenDataStore((state) => [
    state.tokenData,
    state.setTokenData,
  ]);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();
  const query = useQuery({
    queryFn: refreshTokenQuery,
    queryKey: ["token"],
    refetchInterval: 60 * 1000 * 29.5,
    refetchIntervalInBackground: true,
  });

  async function refreshTokenQuery() {
    const tokenDataResponse = await postRefreshToken({
      baseUrl: apiConfig!.baseUrl,
      request: { refreshToken: tokenData?.refreshToken },
      abortController,
    });

    setTokenData(tokenDataResponse);

    return tokenDataResponse;
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useRefreshTokenQuery;
