import { useQuery } from '@tanstack/react-query';
import { getTodayBriefing, getTodayBriefingStatus } from '@/api/briefings';

export function useTodayBriefing() {
  return useQuery({
    queryKey: ['briefings', 'today'],
    queryFn: getTodayBriefing,
  });
}

export function useTodayBriefingCards() {
  return useQuery({
    queryKey: ['briefings', 'status'],
    queryFn: getTodayBriefingStatus,
  });
}
