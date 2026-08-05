import { describe, expect, it } from '@jest/globals';
import { formatEmploymentType } from '../formatEmploymentType';

describe('formatEmploymentType', () => {
  it.each([
    ['regular', '정규직'],
    ['CONTRACT', '계약직'],
    ['intern', '인턴'],
  ])('API 고용 형태 %s를 %s로 표시한다', (employmentType, expected) => {
    expect(formatEmploymentType(employmentType)).toBe(expected);
  });

  it('알 수 없는 고용 형태는 원본 값을 유지한다', () => {
    expect(formatEmploymentType('프리랜서')).toBe('프리랜서');
  });
});
