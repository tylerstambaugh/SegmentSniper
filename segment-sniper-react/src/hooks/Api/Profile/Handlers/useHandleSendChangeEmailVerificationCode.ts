import { CustomToast } from '../../../../components/Molecules/Toast/CustomToast';
import { usePostSendChangeEmailVerificationCode } from '../usePostSendChangeEmailVerificationCode';

const useHandleSendChangeEmailVerificationCode = () => {
  const { mutateAsync, isPending, error } =
    usePostSendChangeEmailVerificationCode();
  async function handle(emailAddress: string) {
    try {
      await mutateAsync({ emailAddress });
    } catch (error) {
      if (error instanceof Error) {
        CustomToast({
          message: 'Error sending verification code',
          error: `Error: ${error.message}`,
          type: 'error',
        });
      }
    }
  }
  return { handle, isPending, error };
};

export default useHandleSendChangeEmailVerificationCode;
