import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/api/auth';

export default function useAccount() {
  return useQuery({
    queryKey: ['auth', 'account'],
    queryFn: getAccount,
  });
}
