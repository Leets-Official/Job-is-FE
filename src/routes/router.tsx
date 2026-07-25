import { createBrowserRouter } from 'react-router';
import avatarDefaultProfile from '@/assets/images/avatar-default-profile.png';
import AuthLayout from '@/components/layout/AuthLayout';
import LandingLayout from '@/components/layout/LandingLayout';
import MainLayout from '@/components/layout/MainLayout';
import CallbackPage from '@/pages/CallbackPage/CallbackPage';
import LandingPage from '@/pages/LandingPage/LandingPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import OnboardingPage from '@/pages/OnboardingPage/OnboardingPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';
import PolicyPage from '@/pages/PolicyPage/PolicyPage';
import RecommendationsPage from '@/pages/RecommendationsPage/RecommendationsPage';

const MAIN_NAVIGATION_TABS = [{ label: '오늘의 추천' }, { label: '탐색' }, { label: '저장 목록' }];

export const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/login/fail', element: <LoginPage state="failed" /> },
      { path: '/login/email-required', element: <LoginPage state="email-required" /> },
      { path: '/policy', element: <PolicyPage /> },
      { path: '/oauth/callback', element: <CallbackPage /> },
      { path: '/playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/onboarding',
        element: <OnboardingPage />,
        handle: {
          header: { variant: 'carousel', totalSteps: 3, activeIndex: 0 },
        },
      },
      {
        path: '/recommendations',
        element: <RecommendationsPage />,
        handle: {
          header: {
            variant: 'tab',
            tabs: MAIN_NAVIGATION_TABS,
            activeIndex: 0,
            profileImageUrl: avatarDefaultProfile,
          },
        },
      },
    ],
  },
]);
