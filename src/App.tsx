import { RouterProvider } from 'react-router';
import QueryProvider from './providers/QueryProvider.tsx';
import { router } from './routes/router.tsx';

export default function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
