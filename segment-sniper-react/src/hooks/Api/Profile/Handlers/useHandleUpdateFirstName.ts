import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { usePatchUpdateUserFirstName } from "../usePostUpdateUserFirstName";

const useHandleUpdateFirstName = () => {
  const { mutateAsync, isLoading } = usePatchUpdateUserFirstName();
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
