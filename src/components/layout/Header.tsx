import { type ReactNode } from 'react';
import Button from '@/components/common/Button';
import CarouselIndicator from '@/components/common/CarouselIndicator';
import Tab from '@/components/common/Tab';
import { cn } from '@/utils/cn';

interface HeaderTabItem {
  label: string;
}

type HeaderBaseProps = { className?: string };

type HeaderProps =
  | (HeaderBaseProps & { variant?: 'default' })
  | (HeaderBaseProps & {
      variant: 'carousel';
      totalSteps: number;
      activeIndex: number;
      onExit?: () => void;
    })
  | (HeaderBaseProps & {
      variant: 'tab';
      tabs: HeaderTabItem[];
      activeIndex: number;
      onTabChange?: (index: number) => void;
      profileImageUrl?: string;
    })
  | (HeaderBaseProps & {
      variant: 'adm';
      tabs: HeaderTabItem[];
      activeIndex: number;
      onTabChange?: (index: number) => void;
      adminEmail: string;
      onLogout?: () => void;
    });

function HeaderShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex w-full items-center justify-center bg-white px-3 pt-3 pb-4',
        className,
      )}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between gap-10">
        {children}
      </div>
    </header>
  );
}

function HeaderLogo({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 shrink-0 items-center">
      <p className="text-display-small leading-none font-bold whitespace-nowrap text-text-secondary">
        {children}
      </p>
    </div>
  );
}

function HeaderTabNav({
  tabs,
  activeIndex,
  onTabChange,
}: {
  tabs: HeaderTabItem[];
  activeIndex: number;
  onTabChange?: (index: number) => void;
}) {
  return (
    <nav className="flex items-center gap-10">
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          label={tab.label}
          active={index === activeIndex}
          className="text-text-primary"
          onClick={() => onTabChange?.(index)}
        />
      ))}
    </nav>
  );
}

export default function Header(props: HeaderProps) {
  const { className } = props;

  if (props.variant === 'carousel') {
    return (
      <HeaderShell className={className}>
        <HeaderLogo>Job.is</HeaderLogo>
        <CarouselIndicator variant="dot" total={props.totalSteps} activeIndex={props.activeIndex} />
        <Button variant="outline" className="h-[50px] w-24" onClick={props.onExit}>
          나가기
        </Button>
      </HeaderShell>
    );
  }

  if (props.variant === 'tab') {
    return (
      <HeaderShell className={className}>
        <HeaderLogo>Job.is</HeaderLogo>
        <HeaderTabNav
          tabs={props.tabs}
          activeIndex={props.activeIndex}
          onTabChange={props.onTabChange}
        />
        {props.profileImageUrl ? (
          <img
            src={props.profileImageUrl}
            alt=""
            className="size-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="size-9 shrink-0 rounded-full bg-gray-100" />
        )}
      </HeaderShell>
    );
  }

  if (props.variant === 'adm') {
    return (
      <HeaderShell className={className}>
        <HeaderLogo>Job.is ADM</HeaderLogo>
        <HeaderTabNav
          tabs={props.tabs}
          activeIndex={props.activeIndex}
          onTabChange={props.onTabChange}
        />
        <div className="flex shrink-0 items-center gap-4">
          <p className="text-label-medium font-medium whitespace-nowrap text-black">
            운영자: {props.adminEmail}
          </p>
          <button
            type="button"
            onClick={props.onLogout}
            className="text-label-medium font-medium whitespace-nowrap text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
          >
            로그아웃
          </button>
        </div>
      </HeaderShell>
    );
  }

  return (
    <HeaderShell className={className}>
      <HeaderLogo>Job.is</HeaderLogo>
      <Button className="h-[50px]">시작하기</Button>
    </HeaderShell>
  );
}
