export async function recoverAccount(recoveryToken: string) {
  if (recoveryToken === 'mock-recovery-token') return;

  const { client } = await import('@/api/client');

  await client.post(
    '/auth/account/recover',
    {},
    {
      headers: { Authorization: `Bearer ${recoveryToken}` },
    },
  );
}
