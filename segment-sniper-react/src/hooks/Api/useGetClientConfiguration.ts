import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApiContract } from '../../services/Api/ApiCommon/ApiContract';
import getClientConfiguration, {
  ClientConfigurationRequest,
  ClientConfigurationResponse,
} from '../../services/Api/getClientConfiguration';

export const useGetClientConfiguration = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  // Use useQuery for fetching data instead of useMutation
  const { data, isLoading, isError, error } = useQuery<
    ClientConfigurationResponse,
    Error
  >({
    queryKey: ['clientConfig'], // Cache key for query
    queryFn: async () => {
      const contract: ApiContract<ClientConfigurationRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
      };

      // Fetch the client configuration
      const response: ClientConfigurationResponse =
        await getClientConfiguration(contract);

      return response;
    },
    enabled: !!apiConfig?.baseRestApiUrl, // Query will only run when the apiConfig is available
  });

  return { data, isLoading, isError, error };
};
