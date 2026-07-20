import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12">
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-label-large text-primary-500">Welcome</p>
          <h1 className="mt-4 text-display-medium text-gray-900">
            Job.is와 함께하는 더 나은 채용 경험
          </h1>
          <p className="mt-4 max-w-2xl text-body-large leading-8 text-gray-600">
            회사와 지원자 모두에게 명확하고 자연스러운 경험을 제공하는 채용 플랫폼입니다.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
