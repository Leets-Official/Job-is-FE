import type { HistoryActionType, HistoryItem } from '@/api/types/savedJobs.types';
import type {
  SavedJobHistoryItem,
  SavedJobHistoryStatus,
} from '@/features/savedJobs/types/savedJob';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

function formatDateLabel(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAY_LABELS[date.getDay()]})`;
}

function formatTimeLabel(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const STATUS_BY_ACTION_TYPE: Partial<Record<HistoryActionType, SavedJobHistoryStatus>> = {
  VIEWED: 'viewed',
  SKIPPED: 'skipped',
  APPLY_INTENT: 'intended',
};

// SAVED 액션은 "저장" 탭에서 별도로 보여주므로 이력 목록에서는 제외
export function mapHistoryItem(item: HistoryItem): SavedJobHistoryItem | null {
  const status = STATUS_BY_ACTION_TYPE[item.actionType];
  if (!status) return null;

  const actionDate = new Date(item.actionAt);

  return {
    id: `${item.jobId}-${item.actionAt}`,
    date: toLocalDateKey(actionDate),
    dateLabel: formatDateLabel(actionDate),
    status,
    title: `${item.companyName} · ${item.title}`,
    time: formatTimeLabel(actionDate),
  };
}
