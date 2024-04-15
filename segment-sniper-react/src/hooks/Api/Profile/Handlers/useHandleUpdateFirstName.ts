import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { usePostUpdateUserFirstName } from "../usePostUpdateUserFirstName";

const useHandleUpdateFirstName = () => {
  const { mutateAsync, isLoading } = usePostUpdateUserFirstName();
  async function handle(firstName: string) {
    try {
      await mutateAsync({ firstName });
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: "Error updating first name",
          error: `Error: ${error.message}`,
          type: "error",
        });
      }
    }
  }
  return { handle, isLoading };
};

export default useHandleUpdateFirstName;
