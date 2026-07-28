import RefreshIcon from '@/assets/icons/icon-refresh.svg?react';
import { Button } from '@/components/common';

export default function ExploreLoadingIndicator() {
  return (
    <div className="flex w-full items-center justify-center" role="status" aria-live="polite">
      <Button className="gap-2" tabIndex={-1}>
        <RefreshIcon className="size-5 animate-spin" />
        불러오는 중 •••
      </Button>
    </div>
  );
}
