import { type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { cn } from '@/utils/cn';

const NAV_TABS = [
  { key: 'today', label: '오늘의 추천', path: '/today' },
  { key: 'explore', label: '탐색', path: '/explore' },
  { key: 'saved', label: '저장 목록', path: '/saved' },
] as const;

type NavTabKey = (typeof NAV_TABS)[number]['key'];

interface AppShellProps {
  variant?: 'home' | 'guest';
  activeTab?: NavTabKey;
  children: ReactNode;
  className?: string;
}

export default function AppShell({
  variant = 'home',
  activeTab = 'today',
  children,
  className,
}: AppShellProps) {
  const navigate = useNavigate();
  const activeIndex = NAV_TABS.findIndex((tab) => tab.key === activeTab);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {variant === 'home' ? (
        <Header
          variant="tab"
          tabs={NAV_TABS.map(({ label }) => ({ label }))}
          activeIndex={activeIndex}
          onTabChange={(index) => navigate(NAV_TABS[index].path)}
        />
      ) : (
        <Header />
      )}
      <main
        className={cn('flex flex-1 flex-col items-center justify-center px-3 py-10', className)}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
