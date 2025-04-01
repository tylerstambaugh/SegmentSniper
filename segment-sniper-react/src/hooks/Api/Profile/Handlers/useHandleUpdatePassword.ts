import { CustomToast } from '../../../../components/Molecules/Toast/CustomToast';
import { usePostUpdatePassword } from '../usePostUpdatePassword';

const useHandleUpdatePassword = () => {
  const { mutateAsync, isPending, error } = usePostUpdatePassword();
  async function handle(currentPassword: string, newPassword: string) {
    try {
      const response = await mutateAsync({ currentPassword, newPassword });

      if (response && response.success) {
        CustomToast({
          message: 'Password updated successfully',
          type: 'success',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: 'Error updating password',
          error: `Error: ${error.message}`,
          type: 'error',
        });
      }
    }
  }
  return { handle, isPending, error };
};

export default useHandleUpdatePassword;
