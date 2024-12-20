import { useMutation, useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApiContract } from '../../services/Api/ApiCommon/ApiContract';
import getClientConfiguration, {
  ClientConfigurationRequest,
  ClientConfigurationResponse,
} from '../../services/Api/getClientConfiguration';

export const useGetClientConfiguration = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const { mutateAsync, data, isLoading, isError, error } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract<ClientConfigurationRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
    };

    const response: ClientConfigurationResponse = await getClientConfiguration(
      contract
    );

    return response;
  }

  return { mutateAsync, data, isLoading, isError, error };
};
