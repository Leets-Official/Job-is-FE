import { create } from 'zustand';

export type RecommendationLetterStatus = 'saved' | 'dismissed' | 'unprocessed';

interface RecommendationDeckState {
  statusByLetterId: Record<string, RecommendationLetterStatus>;
  setStatus: (letterId: string, status: RecommendationLetterStatus) => void;
}

export const useRecommendationDeckStore = create<RecommendationDeckState>((set) => ({
  statusByLetterId: {},
  setStatus: (letterId, status) =>
    set((state) => ({
      statusByLetterId: { ...state.statusByLetterId, [letterId]: status },
    })),
}));

export function getRecommendationLetterStatus(
  statusByLetterId: Record<string, RecommendationLetterStatus>,
  letterId: string,
): RecommendationLetterStatus {
  return statusByLetterId[letterId] ?? 'unprocessed';
}
