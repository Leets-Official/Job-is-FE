import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/HomePage/HomePage';
import JobDetailPage from '@/pages/JobDetailPage/JobDetailPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PlaceholderPage from '@/pages/PlaceholderPage/PlaceholderPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobDetailPage /> },
  { path: '/playground', element: <PlaygroundPage /> },
  { path: '/about', element: <PlaceholderPage title="회사소개" /> },
  { path: '/terms', element: <PlaceholderPage title="이용약관" /> },
  { path: '/privacy', element: <PlaceholderPage title="개인정보처리방침" /> },
  { path: '*', element: <NotFoundPage /> },
]);
