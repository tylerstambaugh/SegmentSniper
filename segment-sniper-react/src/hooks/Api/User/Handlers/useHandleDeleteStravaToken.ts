import { CustomToast } from '../../../../components/Molecules/Toast/CustomToast';
import { useDeleteStravaToken } from '../useDeleteStravaToken';

const useHandleDeleteStravaToken = () => {
  const { mutateAsync, isPending, error, data } = useDeleteStravaToken();
  async function handle() {
    try {
      const response = await mutateAsync();
      if (response && response.success)
        CustomToast({
          message: 'Strava token successfully revoked',
          type: 'success',
        });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: 'Error revoking Strava token',
          error: `Error: ${error.message}`,
          type: 'error',
        });
      }
    }
  }
  return { handle, isPending, error };
};

export default useHandleDeleteStravaToken;
