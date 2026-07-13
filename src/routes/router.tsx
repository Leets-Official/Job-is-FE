import { createBrowserRouter } from 'react-router';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import PlaygroundPage from '@/pages/PlaygroundPage/PlaygroundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/playground', element: <PlaygroundPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
