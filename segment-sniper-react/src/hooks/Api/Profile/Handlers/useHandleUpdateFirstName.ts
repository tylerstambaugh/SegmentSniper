import { CustomToast } from '../../../../components/Molecules/Toast/CustomToast';
import { usePatchUpdateUserFirstName } from '../usePatchUpdateUserFirstName';

const useHandleUpdateFirstName = () => {
  const { mutateAsync, isPending, error, data } = usePatchUpdateUserFirstName();
  async function handle(firstName: string) {
    try {
      const response = await mutateAsync({ firstName });
      if (response && response.profileData.firstName)
        CustomToast({
          message: 'First name succesfully updated',
          type: 'success',
        });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: 'Error updating first name',
          error: `Error: ${error.message}`,
          type: 'error',
        });
      }
    }
  }
  return { handle, isPending, error };
};

export default useHandleUpdateFirstName;
