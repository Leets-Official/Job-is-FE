import { create } from 'zustand';

export type RecommendationLetterStatus = 'saved' | 'dismissed' | 'unprocessed';

interface RecommendationDeckState {
  statusByLetterId: Record<string, RecommendationLetterStatus>;
  setStatus: (letterId: string, status: RecommendationLetterStatus) => void;
  viewedLetterIds: Record<string, true>;
  markViewed: (letterId: string) => void;
  deckIndex: number;
  setDeckIndex: (index: number) => void;
  revisitStatusIndex: number;
  setRevisitStatusIndex: (index: number) => void;
  revisitCardIndex: number;
  setRevisitCardIndex: (index: number) => void;
}

export const useRecommendationDeckStore = create<RecommendationDeckState>((set) => ({
  statusByLetterId: {},
  setStatus: (letterId, status) =>
    set((state) => ({
      statusByLetterId: { ...state.statusByLetterId, [letterId]: status },
    })),
  viewedLetterIds: {},
  markViewed: (letterId) =>
    set((state) =>
      state.viewedLetterIds[letterId]
        ? state
        : { viewedLetterIds: { ...state.viewedLetterIds, [letterId]: true } },
    ),
  deckIndex: 0,
  setDeckIndex: (index) => set({ deckIndex: index }),
  revisitStatusIndex: 0,
  setRevisitStatusIndex: (index) => set({ revisitStatusIndex: index }),
  revisitCardIndex: 0,
  setRevisitCardIndex: (index) => set({ revisitCardIndex: index }),
}));

export function getRecommendationLetterStatus(
  statusByLetterId: Record<string, RecommendationLetterStatus>,
  letterId: string,
): RecommendationLetterStatus {
  return statusByLetterId[letterId] ?? 'unprocessed';
}
