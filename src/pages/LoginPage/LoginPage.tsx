import SocialLoginButton from '@/features/login/components/SocialLoginButton';

export default function LoginPage() {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-3 py-8">
      <div className="flex w-full max-w-190 flex-col items-center gap-5 rounded-md border border-gray-200 bg-white p-6">
        <h1 className="text-heading-xlarge font-bold text-text-primary">Job.is</h1>

        <p className="text-center text-heading-medium font-medium text-text-tertiary">
          로그인하면 <span className="text-text-primary">가입</span>도 함께 완료돼요.
          <br />
          매일 아침, 당신을 위한 추천을 보내드릴게요.
        </p>

        <div className="flex w-full max-w-104 flex-col gap-3">
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="kakao" />
        </div>

        <div className="w-full max-w-104 rounded-xs border border-dashed border-gray-400 bg-gray-200 p-6">
          <p className="text-center text-label-medium font-medium text-text-tertiary">
            브리핑 발송을 위해 이메일이 필요해요.
            <br />
            제공에 동의하지 않으면 가입을 완료할 수 없어요.
          </p>
        </div>

        <p className="text-center text-body-medium font-medium text-text-tertiary">
          계속하면{' '}
          <a
            href="/terms"
            className="text-text-secondary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
          >
            이용약관
          </a>{' '}
          •{' '}
          <a
            href="/privacy"
            className="text-text-secondary underline decoration-solid decoration-from-font [text-underline-position:from-font]"
          >
            개인정보처리방침
          </a>
          에
          <br />
          동의하는 것으로 간주돼요.
        </p>
      </div>
    </div>
  );
}
