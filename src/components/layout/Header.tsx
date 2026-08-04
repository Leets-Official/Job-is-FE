import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import LogoIcon from '@/assets/icons/logo.svg?react';
import Button from '@/components/common/Button';
import CarouselIndicator from '@/components/common/CarouselIndicator';
import Tab from '@/components/common/Tab';
import { useAuthStore } from '@/features/login/store/useAuthStore';
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
      <div className="flex w-full max-w-300 items-center justify-between gap-10">{children}</div>
    </header>
  );
}

function HeaderTabShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex w-full items-center justify-center bg-white px-3 pt-3 pb-4',
        className,
      )}
    >
      <div className="flex h-15 w-full max-w-320 items-center">{children}</div>
    </header>
  );
}

function HeaderLogo({ suffix, to = '/' }: { suffix?: ReactNode; to?: string }) {
  return (
    <Link to={to} className="flex h-15 shrink-0 items-center gap-1 max-sm:h-10">
      <LogoIcon className="h-15 w-auto max-sm:h-10" role="img" aria-label="Job.is" />
      {suffix && (
        <span className="text-display-small leading-none font-bold whitespace-nowrap text-text-secondary">
          {suffix}
        </span>
      )}
    </Link>
  );
}

function HeaderTabNav({
  tabs,
  activeIndex,
  onTabChange,
  className,
}: {
  tabs: HeaderTabItem[];
  activeIndex: number;
  onTabChange?: (index: number) => void;
  className?: string;
}) {
  return (
    <nav className={cn('flex min-w-0 items-center gap-10', className)}>
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
  const navigate = useNavigate();
  const onboardingCompleted = useAuthStore((state) => state.onboardingCompleted);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const homeDestination = onboardingCompleted
    ? '/recommendations?preview=intro'
    : '/recommendations';

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (profileMenuRef.current?.contains(event.target as Node)) return;
      setIsProfileMenuOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsProfileMenuOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  if (props.variant === 'carousel') {
    return (
      <HeaderShell className={className}>
        <HeaderLogo to={homeDestination} />
        <CarouselIndicator variant="dot" total={props.totalSteps} activeIndex={props.activeIndex} />
        <Button variant="outline" className="h-12.5 w-24" onClick={props.onExit}>
          나가기
        </Button>
      </HeaderShell>
    );
  }

  if (props.variant === 'tab') {
    return (
      <HeaderTabShell className={className}>
        <HeaderLogo to={homeDestination} />
        <HeaderTabNav
          tabs={props.tabs}
          activeIndex={props.activeIndex}
          onTabChange={props.onTabChange}
          className="h-10 flex-1 px-12.5 max-sm:gap-3 max-sm:px-3"
        />
        <div ref={profileMenuRef} className="relative mr-2 shrink-0">
          <button
            type="button"
            className="size-9 cursor-pointer rounded-full"
            onClick={() => setIsProfileMenuOpen((previous) => !previous)}
            aria-label="프로필 메뉴 열기"
            aria-expanded={isProfileMenuOpen}
            aria-controls="profile-menu"
          >
            {props.profileImageUrl ? (
              <img
                src={props.profileImageUrl}
                alt=""
                className="size-full rounded-full object-cover"
              />
            ) : (
              <span className="block size-full rounded-full bg-gray-100" />
            )}
          </button>
          {isProfileMenuOpen && (
            <div
              id="profile-menu"
              role="menu"
              aria-label="프로필 메뉴"
              className="header-profile-menu-enter absolute top-full right-0 z-20 mt-2 flex w-28 flex-col overflow-hidden rounded-sm border border-gray-200 bg-white py-1 shadow-md"
            >
              <button
                type="button"
                role="menuitem"
                className="cursor-pointer px-4 py-3 text-left text-label-medium font-medium text-text-primary hover:bg-gray-50"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate('/profile');
                }}
              >
                프로필
              </button>
              <button
                type="button"
                role="menuitem"
                className="cursor-pointer px-4 py-3 text-left text-label-medium font-medium text-text-primary hover:bg-gray-50"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate('/settings/notifications');
                }}
              >
                설정
              </button>
            </div>
          )}
        </div>
      </HeaderTabShell>
    );
  }

  if (props.variant === 'adm') {
    return (
      <HeaderShell className={className}>
        <HeaderLogo suffix="ADM" />
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
            className="cursor-pointer text-label-medium font-medium whitespace-nowrap text-text-tertiary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
          >
            로그아웃
          </button>
        </div>
      </HeaderShell>
    );
  }

  return (
    <HeaderShell className={className}>
      <HeaderLogo />
      <Button className="h-12.5" onClick={() => navigate('/login')}>
        시작하기
      </Button>
    </HeaderShell>
  );
}
