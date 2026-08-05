const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  regular: '정규직',
  contract: '계약직',
  intern: '인턴',
};

export function formatEmploymentType(employmentType: string): string {
  return EMPLOYMENT_TYPE_LABELS[employmentType.toLowerCase()] ?? employmentType;
}
