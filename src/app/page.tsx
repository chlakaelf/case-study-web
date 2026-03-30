import Link from "next/link";

const categories = [
  { id: "all", label: "전체" },
  { id: "google-trends", label: "구글트렌드" },
  { id: "consumer", label: "소비재" },
  { id: "cycle", label: "사이클" },
];

const caseStudies = [
  {
    slug: "hoka-google-trends",
    title: "소비재 실적 · 구글트렌드의 시사",
    subtitle: "HOKA One One을 중심으로",
    category: "google-trends",
    tags: ["구글트렌드", "소비재", "D2C"],
    summary:
      "구글트렌드와 소비재 실적 간 시차와 주가 고점-주가 구매 패턴 분석. 트렌드-실적 간 고점의 딜레이는 약 3분기, 소비자들의 오프라인으로 접하고 구매 패턴 파급.",
    date: "2026-03",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3">
          투자 케이스스터디
        </h1>
        <p className="text-zinc-500 text-lg">
          기업이 아닌 사례 중심으로 정리한 투자 분석 모음
        </p>
      </section>

      <div className="flex gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              cat.id === "all"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/cases/${cs.slug}`}
            className="group block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
              {cs.title}
            </h2>
            <p className="text-sm text-zinc-500 mb-3">{cs.subtitle}</p>
            <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
              {cs.summary}
            </p>
            <div className="mt-4 text-xs text-zinc-400">{cs.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
