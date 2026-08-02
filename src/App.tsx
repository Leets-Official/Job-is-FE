import { RouterProvider } from 'react-router';
import AuthSessionSync from '@/features/login/components/AuthSessionSync.tsx';
import QueryProvider from './providers/QueryProvider.tsx';
import { router } from './routes/router.tsx';

export default function App() {
  return (
    <QueryProvider>
      <AuthSessionSync />
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
