export default function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">대시보드 홈</h2>
      <p className="text-gray-700">메인 영역입니다. 위젯이나 차트를 여기에.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-xl p-4 shadow">위젯 A</div>
        <div className="bg-white rounded-xl p-4 shadow">위젯 B</div>
      </div>
    </div>
  );
}
