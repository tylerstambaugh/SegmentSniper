import { useMutation, useQuery } from "@tanstack/react-query";
import useApiConfigStore from "../../stores/useApiConfigStore";
import { ApiContract } from "../../services/Api/ApiCommon/ApiContract";
import getClientConfiguration, {
  ClientConfigurationResponse,
} from "../../services/Api/getClientConfiguration";

export const useGetClientConfiguration = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const { mutate, data, isLoading, isError, error } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
    };

    const response: ClientConfigurationResponse = await getClientConfiguration(
      contract
    );

    return response;
  }

  return { mutate, data, isLoading, isError, error };
};
