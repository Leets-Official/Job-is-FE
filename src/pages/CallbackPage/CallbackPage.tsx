import LoginCallbackContent from '@/features/login/components/LoginCallbackContent';

export default function CallbackPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>
        <LoginCallbackContent />
      </div>
    </div>
  );
}
