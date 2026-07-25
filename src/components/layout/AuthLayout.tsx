import { Outlet, useLocation } from 'react-router';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <div key={location.pathname} className="page-content-enter flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
