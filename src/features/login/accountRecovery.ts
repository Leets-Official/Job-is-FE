export const RECOVERY_TOKEN_STORAGE_KEY = 'job-is-recovery-token';

export interface AccountRecoveryLocationState {
  recoveryDeadline: string;
}

export function getRemainingRecoveryDays(recoveryDeadline: string) {
  const deadline = new Date(recoveryDeadline);
  const currentTime = new Date();
  const remainingMilliseconds = deadline.getTime() - currentTime.getTime();

  return Math.max(0, Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24)));
}

export function formatRecoveryDeadline(recoveryDeadline: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(new Date(recoveryDeadline));
}
