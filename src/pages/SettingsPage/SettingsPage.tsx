import AccountSettingsContent from '@/features/settings/components/AccountSettingsContent';
import NotificationSettingsContent from '@/features/settings/components/NotificationSettingsContent';
import PrivacySettingsContent from '@/features/settings/components/PrivacySettingsContent';
import SettingsSidebar from '@/features/settings/components/SettingsSidebar';

export default function SettingsPage({
  screen = 'notifications',
}: {
  screen?: 'notifications' | 'account' | 'privacy';
}) {
  const settingsContent =
    screen === 'account' ? (
      <AccountSettingsContent />
    ) : screen === 'privacy' ? (
      <PrivacySettingsContent />
    ) : (
      <NotificationSettingsContent />
    );

  return (
    <div className="flex flex-1 justify-center bg-gray-50 px-5 py-30">
      <div className="flex w-full max-w-298 items-start gap-38 max-lg:gap-10 max-md:flex-col">
        <SettingsSidebar />
        {settingsContent}
      </div>
    </div>
  );
}
