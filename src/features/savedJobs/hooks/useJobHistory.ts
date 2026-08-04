import { useInfiniteQuery } from '@tanstack/react-query';
import { getHistory, type HistoryFilter } from '@/api/history';

const HISTORY_PAGE_SIZE = 24;

export function useJobHistory(filter: HistoryFilter) {
  return useInfiniteQuery({
    queryKey: ['history', filter],
    queryFn: ({ pageParam }) => getHistory({ page: pageParam, size: HISTORY_PAGE_SIZE, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.page + 1),
  });
}
