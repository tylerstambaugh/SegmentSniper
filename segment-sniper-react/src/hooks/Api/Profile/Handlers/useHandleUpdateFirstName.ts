import { CustomToast } from "../../../../components/Molecules/Toast/CustomToast";
import { usePatchUpdateUserFirstName } from "../usePatchUpdateUserFirstName";

const useHandleUpdateFirstName = () => {
  const { mutateAsync, isLoading, error, data } = usePatchUpdateUserFirstName();
  async function handle(firstName: string) {
    try {
      await mutateAsync({ firstName });
      return data;
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
  return { handle, isLoading, error };
};

export default useHandleUpdateFirstName;
