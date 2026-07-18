type PlaceholderPageProps = {
  title: string;
};

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-6 py-20">
      <h1 className="text-heading-medium text-gray-900">{title}</h1>
    </div>
  );
}
