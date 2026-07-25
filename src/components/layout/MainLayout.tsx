import { useState } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

type MainLayoutTab = {
  label: string;
};

type MainLayoutHeaderHandle =
  | { variant?: 'default' }
  | { variant: 'carousel'; totalSteps: number; activeIndex: number; exitTo?: string }
  | {
      variant: 'tab';
      tabs: MainLayoutTab[];
      activeIndex: number;
      profileImageUrl?: string;
    };

export interface MainLayoutRouteHandle {
  header?: MainLayoutHeaderHandle;
}

export interface MainLayoutOutletContext {
  setCarouselActiveIndex: (activeIndex: number) => void;
}

export default function MainLayout() {
  const navigate = useNavigate();
  const matches = useMatches();
  const headerHandle = (matches.at(-1)?.handle as MainLayoutRouteHandle | undefined)?.header;
  const initialCarouselActiveIndex =
    headerHandle?.variant === 'carousel' ? headerHandle.activeIndex : 0;
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(initialCarouselActiveIndex);

  return (
    <div className="flex min-h-screen flex-col">
      {headerHandle?.variant === 'carousel' ? (
        <Header
          variant="carousel"
          totalSteps={headerHandle.totalSteps}
          activeIndex={carouselActiveIndex}
          onExit={() => navigate(headerHandle.exitTo ?? '/')}
        />
      ) : headerHandle?.variant === 'tab' ? (
        <Header
          variant="tab"
          tabs={headerHandle.tabs}
          activeIndex={headerHandle.activeIndex}
          profileImageUrl={headerHandle.profileImageUrl}
        />
      ) : (
        <Header />
      )}
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet
          context={
            headerHandle?.variant === 'carousel'
              ? ({ setCarouselActiveIndex } satisfies MainLayoutOutletContext)
              : undefined
          }
        />
      </main>
      <Footer />
    </div>
  );
}
