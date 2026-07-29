import DailyBriefingSettingsCard from '@/features/settings/components/DailyBriefingSettingsCard';
import MarketingConsentCard from '@/features/settings/components/MarketingConsentCard';
import NotificationPauseCard from '@/features/settings/components/NotificationPauseCard';
import SettingsStatusBanner from '@/features/settings/components/SettingsStatusBanner';

export default function NotificationSettingsContent() {
  return (
    <div className="flex min-w-0 max-w-185 flex-1 flex-col gap-5">
      <SettingsStatusBanner />
      <DailyBriefingSettingsCard />
      <NotificationPauseCard />
      <MarketingConsentCard />
    </div>
  );
}
