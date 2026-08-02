import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getCurrentSession } from '@/api/auth';
import {
  setOnboardingCompleted,
  setUserId,
  useAuthStore,
} from '@/features/login/store/useAuthStore';

export default function AuthSessionSync() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data: session } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: getCurrentSession,
    enabled: Boolean(accessToken),
    retry: false,
  });

  useEffect(() => {
    if (!session) return;

    setUserId(session.userId);
    setOnboardingCompleted(session.onboardingCompleted);
  }, [session]);

  return null;
}
