"use client";

type LogItem = {
  text: string;
  time?: string;
  tone?: "info" | "warn" | "danger";
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3">
      <h4 className="mb-2 text-sm font-semibold text-gray-700">{title}</h4>
      {children}
    </div>
  );
}

function Dot({ tone = "info" }: { tone?: "info" | "warn" | "danger" }) {
  const map = {
    info: "bg-blue-500",
    warn: "bg-amber-500",
    danger: "bg-red-500",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${map[tone]}`} />;
}

export default function RightSidebar() {
  // 샘플 데이터 (API 연결 시 교체)
  const notices: LogItem[] = [
    { text: "test01 O₂ 주의발생", time: "10:31:21", tone: "warn" },
    { text: "H₂S 감지", time: "10:29:10", tone: "warn" },
  ];
  const alerts: LogItem[] = [
    { text: "O₂ 농도 초과", time: "10:28:45", tone: "danger" },
    { text: "가스농도 초과", time: "10:21:12", tone: "danger" },
  ];
  const posts: LogItem[] = [
    { text: "[공지] test01 O₂ 주의발생", time: "09:50:00", tone: "info" },
  ];
  const works: LogItem[] = [
    { text: "[작업] 콘크리트 타설 진행중", time: "08:10:00", tone: "info" },
    { text: "[작업] 골조 양중 대기", time: "07:40:00", tone: "info" },
  ];

  return (
    <aside className="w-80 shrink-0 border-l bg-white">
      <div className="h-full overflow-y-auto p-4">
        {/* ▶ 한 개의 큰 카드 안에 ‘여러 섹션’ */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* 헤더(썸네일/요약) */}
          <div className="flex items-center gap-3 p-4">
            <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
              {/* 이미지가 있다면 <img className="h-full w-full object-cover" src="..." /> */}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                대구교 수로공사
              </p>
              <p className="truncate text-xs text-gray-500">진행률 40%</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 섹션들 */}
          <Section title="실시간 주의알림">
            <ul className="space-y-2 text-sm">
              {notices.map((n, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dot tone="warn" />
                    <span className="truncate">{n.text}</span>
                  </div>
                  <span className="ml-2 shrink-0 text-xs text-gray-400">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <hr className="border-gray-200" />

          <Section title="실시간 경고알림">
            <ul className="space-y-2 text-sm">
              {alerts.map((n, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dot tone="danger" />
                    <span className="truncate">{n.text}</span>
                  </div>
                  <span className="ml-2 shrink-0 text-xs text-gray-400">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <hr className="border-gray-200" />

          <Section title="공지사항">
            <ul className="space-y-2 text-sm">
              {posts.map((n, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dot tone="info" />
                    <span className="truncate">{n.text}</span>
                  </div>
                  <span className="ml-2 shrink-0 text-xs text-gray-400">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <hr className="border-gray-200" />

          <Section title="주요 작업정보">
            <ul className="space-y-2 text-sm">
              {works.map((n, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dot tone="info" />
                    <span className="truncate">{n.text}</span>
                  </div>
                  <span className="ml-2 shrink-0 text-xs text-gray-400">
                    {n.time}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <hr className="border-gray-200" />

          <Section title="안전수칙 가이드">
            <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-600">
              대구광역시, 폭염 속 건설현장 특별점검 실시
            </div>
          </Section>
        </div>
      </div>
    </aside>
  );
}
