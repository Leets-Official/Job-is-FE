import { useLocation, useNavigate } from 'react-router';
import ProfileDocumentsManager from '@/features/profile/components/ProfileDocumentsManager';

export default function ProfileDocumentsPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const isFromOnboarding = new URLSearchParams(search).get('from') === 'onboarding';
  const returnPath = isFromOnboarding ? '/onboarding' : '/profile';

  return (
    <div className="flex flex-1 items-start justify-center bg-gray-50 px-5 py-16 lg:py-30">
      <ProfileDocumentsManager
        onBack={() => navigate(returnPath)}
        backLabel={isFromOnboarding ? '이전' : '내 프로필로'}
      />
    </div>
  );
}
