import { createBrowserRouter } from 'react-router';
import avatarDefaultProfile from '@/assets/images/avatar-default-profile.png';
import AuthLayout from '@/components/layout/AuthLayout';
import LandingLayout from '@/components/layout/LandingLayout';
import MainLayout from '@/components/layout/MainLayout';
import CallbackPage from '@/pages/CallbackPage/CallbackPage';
import ExplorePage from '@/pages/ExplorePage/ExplorePage';
import JobDetailPage from '@/pages/JobDetailPage/JobDetailPage';
import LandingPage from '@/pages/LandingPage/LandingPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import OnboardingPage from '@/pages/OnboardingPage/OnboardingPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';
import PolicyPage from '@/pages/PolicyPage/PolicyPage';
import RecommendationsPage from '@/pages/RecommendationsPage/RecommendationsPage';
import SavedJobsPage from '@/pages/SavedJobsPage/SavedJobsPage';

const MAIN_NAVIGATION_TABS = [
  { label: '오늘의 추천', path: '/recommendations' },
  { label: '탐색', path: '/explore' },
  { label: '저장 목록', path: '/saved' },
];

const MAIN_TAB_HEADER = {
  variant: 'tab' as const,
  tabs: MAIN_NAVIGATION_TABS,
  profileImageUrl: avatarDefaultProfile,
};

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
            ...MAIN_TAB_HEADER,
            activeIndex: 0,
          },
        },
      },
      {
        path: '/recommendations/deck',
        element: <RecommendationsPage screen="deck" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/recommendations/news',
        element: <RecommendationsPage screen="news" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/recommendations/complete',
        element: <RecommendationsPage screen="complete" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/recommendations/archive',
        element: <RecommendationsPage screen="archive" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 2 } },
      },
      {
        path: '/recommendations/empty-candidates',
        element: <RecommendationsPage screen="empty-candidates" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/recommendations/empty-signup',
        element: <RecommendationsPage screen="empty-signup" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/recommendations/empty-before-send',
        element: <RecommendationsPage screen="empty-before-send" />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/explore',
        element: <ExplorePage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 1 } },
      },
      {
        path: '/saved',
        element: <SavedJobsPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 2 } },
      },
      {
        path: '/jobs/:id',
        element: <JobDetailPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
