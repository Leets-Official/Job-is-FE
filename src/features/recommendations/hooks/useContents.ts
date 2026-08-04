import { useQuery } from '@tanstack/react-query';
import { getContent, getContents } from '@/api/contents';

export function useContents() {
  return useQuery({
    queryKey: ['contents'],
    queryFn: getContents,
  });
}

export function useContentDetail(contentId: number) {
  return useQuery({
    queryKey: ['contents', contentId],
    queryFn: () => getContent(contentId),
    enabled: Number.isFinite(contentId),
  });
}
