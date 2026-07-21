import { createBrowserRouter } from 'react-router';
import AuthLayout from '@/components/layout/AuthLayout';
import LandingLayout from '@/components/layout/LandingLayout';
import LandingPage from '@/pages/LandingPage/LandingPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';

export const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/playground', element: <PlaygroundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
