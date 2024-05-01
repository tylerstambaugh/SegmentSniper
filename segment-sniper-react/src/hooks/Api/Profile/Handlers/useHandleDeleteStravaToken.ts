import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { useDeleteStravaToken } from "../useDeleteStravaToken";
import { usePostSendChangeEmailVerificationCode } from "../usePostSendChangeEmailVerificationCode";

const useHandleDeleteStravaTokene = () => {
  const { mutateAsync, isLoading, error, data } = useDeleteStravaToken();
  async function handle(stravaToken: string) {
    try {
      const response = await mutateAsync({ stravaToken });
      if (response && response.success)
        CustomToast({
          message: "Strava token successfully revoked",
          type: "success",
        });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: "Error revoking Strava token",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }
  }
  return { handle, isLoading, error };
};

export default useHandleDeleteStravaTokene;
