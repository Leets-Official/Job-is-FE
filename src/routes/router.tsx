import { createBrowserRouter } from 'react-router';
import AuthLayout from '@/components/layout/AuthLayout';
import LandingLayout from '@/components/layout/LandingLayout';
import ExplorePage from '@/pages/ExplorePage/ExplorePage';
import JobDetailPage from '@/pages/JobDetailPage/JobDetailPage';
import LandingPage from '@/pages/LandingPage/LandingPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';
import RecommendationBriefingDeckPage from '@/pages/RecommendationBriefingDeckPage/RecommendationBriefingDeckPage';
import RecommendationDeckCompletePage from '@/pages/RecommendationDeckCompletePage/RecommendationDeckCompletePage';
import RecommendationEmptyBeforeSendPage from '@/pages/RecommendationEmptyBeforeSendPage/RecommendationEmptyBeforeSendPage';
import RecommendationEmptyCandidatesPage from '@/pages/RecommendationEmptyCandidatesPage/RecommendationEmptyCandidatesPage';
import RecommendationEmptySignupPage from '@/pages/RecommendationEmptySignupPage/RecommendationEmptySignupPage';
import RecommendationIntroPage from '@/pages/RecommendationIntroPage/RecommendationIntroPage';
import RecommendationNewsPage from '@/pages/RecommendationNewsPage/RecommendationNewsPage';
import RecommendationRevisitPage from '@/pages/RecommendationRevisitPage/RecommendationRevisitPage';

export const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/today', element: <RecommendationIntroPage /> },
      { path: '/today/deck', element: <RecommendationBriefingDeckPage /> },
      { path: '/today/news', element: <RecommendationNewsPage /> },
      { path: '/today/complete', element: <RecommendationDeckCompletePage /> },
      { path: '/today/revisit', element: <RecommendationRevisitPage /> },
      { path: '/today/empty-candidates', element: <RecommendationEmptyCandidatesPage /> },
      { path: '/today/empty-signup', element: <RecommendationEmptySignupPage /> },
      { path: '/today/empty-before-send', element: <RecommendationEmptyBeforeSendPage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/jobs/:id', element: <JobDetailPage /> },
      { path: '/playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
