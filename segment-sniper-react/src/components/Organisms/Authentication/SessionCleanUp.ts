import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import useUserStore from '../../../stores/useUserStore';

export const SessionCleanup = () => {
  const resetUser = useUserStore((state) => state.resetUserStore);
  const queryClient = useQueryClient();

  useEffect(() => {
    resetUser();
    queryClient.clear();
    localStorage.clear();
  }, []);

  return null;
};
