import { useNavigate } from 'react-router';
import ProfileDocumentsManager from '@/features/profile/components/ProfileDocumentsManager';

export default function ProfileDocumentsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-start justify-center bg-gray-50 px-5 py-16 lg:py-30">
      <ProfileDocumentsManager onBack={() => navigate('/profile')} />
    </div>
  );
}
