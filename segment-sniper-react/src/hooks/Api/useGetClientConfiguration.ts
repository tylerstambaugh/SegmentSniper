import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApiContract } from '../../services/Api/ApiCommon/ApiContract';
import getClientConfiguration, {
  ClientConfigurationRequest,
  ClientConfigurationResponse,
} from '../../services/Api/getClientConfiguration';

export const useGetClientConfiguration = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const { data, isLoading, isError, error } = useQuery<
    ClientConfigurationResponse,
    Error
  >({
    queryKey: ['clientConfig'],
    queryFn: async () => {
      const contract: ApiContract<ClientConfigurationRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
      };

      const response: ClientConfigurationResponse =
        await getClientConfiguration(contract);

      return response;
    },
    enabled: !!apiConfig?.baseRestApiUrl,
  });

  return { data, isLoading, isError, error };
};
