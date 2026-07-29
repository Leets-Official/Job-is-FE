import Tag from '@/components/common/Tag';
import ProfileFieldLabel from '@/features/profile/components/ProfileFieldLabel';

const LIFESTYLE_TAGS = ['# 성장 지향', '# 실무형', '# 협업 중시'];

export default function ProfileLifestyleSection() {
  return (
    <section className="border-b border-gray-400 pb-5">
      <ProfileFieldLabel status="읽기 전용">성향 결과 태그</ProfileFieldLabel>
      <div className="mt-5 flex flex-wrap gap-2">
        {LIFESTYLE_TAGS.map((tag) => (
          <Tag key={tag} variant="plain" label={tag} className="h-10 px-3 text-label-large" />
        ))}
      </div>
    </section>
  );
}
