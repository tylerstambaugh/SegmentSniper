import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { usePostUpdateEmailAddress } from "../usePostUpdateEmailAddress";

const useHandleUpdateEmailAddress = () => {
  const { mutateAsync, isLoading } = usePostUpdateEmailAddress();
  async function handle(emailAddress: string, verificationCode: number) {
    try {
      await mutateAsync({ emailAddress, verificationCode });
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: "Error updating email address",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }
  }
  return { handle, isLoading };
};

export default useHandleUpdateEmailAddress;
