import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { usePostUpdatePassword } from "../usePostUpdatePassword";

const useHandleUpdatePassword = () => {
  const { mutateAsync, isLoading, error, data } = usePostUpdatePassword();
  async function handle(currentPassword: string, newPassword: string) {
    try {
      const response = await mutateAsync({ currentPassword, newPassword });

      if (response && response.success) {
        CustomToast({
          message: "Password updated successfully",
          type: "success",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: "Error updating password",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }
  }
  return { handle, isLoading, error };
};

export default useHandleUpdatePassword;
