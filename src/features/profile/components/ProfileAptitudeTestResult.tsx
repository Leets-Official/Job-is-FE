import Button from '@/components/common/Button';
import Tag from '@/components/common/Tag';

const RESULT_TAGS = ['성장 지향', '실무형', '협업 중시'];

export default function ProfileAptitudeTestResult({
  onApply,
  onRetry,
}: {
  onApply: () => void;
  onRetry: () => void;
}) {
  return (
    <section className="flex w-full max-w-190 flex-col items-center gap-5 overflow-hidden rounded-md border border-gray-200 bg-white px-8 py-6">
      <h1 className="w-full text-center text-label-medium font-medium text-text-primary">
        결과 · 선호 태그 시드
      </h1>

      <div className="flex w-full flex-wrap justify-center gap-2.5">
        {RESULT_TAGS.map((tag) => (
          <Tag key={tag} variant="hash" label={tag} />
        ))}
      </div>

      <p className="w-full text-center text-label-medium font-medium text-text-secondary">
        이 태그를 프로필 선호 조건에 반영해요.
      </p>

      <div className="flex w-full flex-wrap items-center justify-center gap-2.5">
        <Button className="w-37.5" onClick={onApply}>
          프로필에 반영
        </Button>
        <Button variant="outline" className="w-37.5" onClick={onRetry}>
          다시 응시
        </Button>
      </div>
    </section>
  );
}
