import Button from '@/components/common/Button';

export default function PlaygroundPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-xl font-bold">Component Playground</h1>
      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Button</h2>
        <Button>버튼</Button>
      </section>
    </div>
  );
}
