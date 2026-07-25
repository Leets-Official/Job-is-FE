import { useState } from 'react';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
}

const AGREEMENT_ITEMS: AgreementItem[] = [
  { id: 'terms', label: '이용약관 동의', required: true },
  { id: 'privacy', label: '개인 정보 수집 • 이용 동의 (브리핑 포함)', required: true },
  { id: 'age', label: '만 14세 이상입니다', required: true },
  { id: 'marketing', label: '마케팅 정보 수신', required: false },
];

export default function PolicyPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    terms: true,
    privacy: true,
    age: true,
    marketing: false,
  });

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>
        <p className="text-heading-medium font-semibold text-text-primary">
          서비스에 동의해주세요.
        </p>

        <div className="flex w-full max-w-104 flex-col gap-5">
          {AGREEMENT_ITEMS.map((item) => (
            <div key={item.id} className="flex w-full items-center justify-between">
              <Checkbox
                id={item.id}
                label={item.label}
                checked={checked[item.id]}
                onChange={(event) =>
                  setChecked((prev) => ({ ...prev, [item.id]: event.target.checked }))
                }
              />
              <Badge color={item.required ? 'primary' : 'disabled'}>
                {item.required ? '필수' : '선택'}
              </Badge>
            </div>
          ))}
        </div>

        <Button className="w-full max-w-104">다음</Button>
      </div>
    </div>
  );
}
