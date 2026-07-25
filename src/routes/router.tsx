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
import RecommendationBriefingDeckPage from '@/pages/RecommendationBriefingDeckPage/RecommendationBriefingDeckPage';
import RecommendationDeckCompletePage from '@/pages/RecommendationDeckCompletePage/RecommendationDeckCompletePage';
import RecommendationEmptyBeforeSendPage from '@/pages/RecommendationEmptyBeforeSendPage/RecommendationEmptyBeforeSendPage';
import RecommendationEmptyCandidatesPage from '@/pages/RecommendationEmptyCandidatesPage/RecommendationEmptyCandidatesPage';
import RecommendationEmptySignupPage from '@/pages/RecommendationEmptySignupPage/RecommendationEmptySignupPage';
import RecommendationIntroPage from '@/pages/RecommendationIntroPage/RecommendationIntroPage';
import RecommendationNewsPage from '@/pages/RecommendationNewsPage/RecommendationNewsPage';
import RecommendationRevisitPage from '@/pages/RecommendationRevisitPage/RecommendationRevisitPage';
import RecommendationsPage from '@/pages/RecommendationsPage/RecommendationsPage';

const MAIN_NAVIGATION_TABS = [
  { label: '오늘의 추천', path: '/today' },
  { label: '탐색', path: '/explore' },
  { label: '저장 목록', path: '/today/revisit' },
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
        path: '/today',
        element: <RecommendationIntroPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/deck',
        element: <RecommendationBriefingDeckPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/news',
        element: <RecommendationNewsPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/complete',
        element: <RecommendationDeckCompletePage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/revisit',
        element: <RecommendationRevisitPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 2 } },
      },
      {
        path: '/today/empty-candidates',
        element: <RecommendationEmptyCandidatesPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/empty-signup',
        element: <RecommendationEmptySignupPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/today/empty-before-send',
        element: <RecommendationEmptyBeforeSendPage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 0 } },
      },
      {
        path: '/explore',
        element: <ExplorePage />,
        handle: { header: { ...MAIN_TAB_HEADER, activeIndex: 1 } },
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
