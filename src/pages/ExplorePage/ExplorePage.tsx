import AppShell from '@/components/layout/AppShell';

export default function ExplorePage() {
  return (
    <AppShell activeTab="explore">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-heading-large font-bold text-text-primary">탐색</h1>
        <p className="text-body-large font-medium text-text-secondary">
          탐색 화면은 아직 준비 중이에요.
        </p>
      </div>
    </AppShell>
  );
}
