export default function SettingsStatusBanner() {
  return (
    <div
      className="flex h-14 items-center rounded-xs border border-gray-500 bg-white px-6"
      role="status"
    >
      <p className="text-label-medium font-medium text-text-primary">
        메일이 반송되고 있어요. 주소를 확인해 주세요.
      </p>
    </div>
  );
}
