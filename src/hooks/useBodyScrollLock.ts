import { useEffect } from 'react';

export default function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousScrollbarWidth =
      document.documentElement.style.getPropertyValue('--scrollbar-width');

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.documentElement.style.setProperty('--scrollbar-width', previousScrollbarWidth);
    };
  }, [isLocked]);
}
