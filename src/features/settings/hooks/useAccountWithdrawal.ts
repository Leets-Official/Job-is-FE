import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withdrawAccount, type WithdrawalRequest } from '@/api/auth';
import { clearAuth } from '@/features/login/store/useAuthStore';

export default function useAccountWithdrawal(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const withdrawalMutation = useMutation({
    mutationFn: withdrawAccount,
    onSuccess: () => {
      queryClient.clear();
      clearAuth();
      onSuccess();
    },
  });

  return {
    withdrawAccount: async (request: WithdrawalRequest) => {
      await withdrawalMutation.mutateAsync(request);
    },
    isWithdrawing: withdrawalMutation.isPending,
    isWithdrawalError: withdrawalMutation.isError,
  };
}
