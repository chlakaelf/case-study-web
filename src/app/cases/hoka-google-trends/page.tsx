import Link from "next/link";

export default function HokaCaseStudy() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        &larr; 전체 케이스
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          {["구글트렌드", "소비재", "D2C"].map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          소비재 실적 · 구글트렌드의 시사
        </h1>
        <p className="text-lg text-zinc-500">HOKA One One을 중심으로</p>
        <div className="mt-4 text-sm text-zinc-400">2026년 3월</div>
      </header>

      <div className="prose prose-zinc max-w-none">
        <Section title="트렌드·실적 간 고점의 딜레이는 약 3Q">
          <p>
            구글트렌드와 소비재 실적 간 시차가 존재하며, 소비자들이 오프라인으로
            접하고 구매하는 패턴이 파급되는 데에는 시간이 걸린다.
          </p>
          <ul>
            <li>
              신규 제품을 1차적으로 접하는 것은 1) 일단 이른 아답터 2) 딥한
              아답터의 영향권 추가 구매 유입 3) 그 고점에서 보고 경험 후 구매로의
              수요까지. 구글트렌드에서의 &quot;가장 보편적 다수&quot;의 유입이 가
              단계의 그 사이에 걸쳐 있으므로, 트렌드 고점에서 실적 고점까지는 약
              3분기 정도의 딜레이가 존재한다.
            </li>
          </ul>
        </Section>

        <Section title="가설: 트레이드 오프 구간">
          <p>
            트래픽을 고점을 보고 단기 &quot;확산 → 소비&quot;를 관계에서 파는 것은
            트레이딩이 되고, 시리즈의 확장을 통한 소비자 다각화를 통해 트렌드의
            늘어남, 즉 플리어 이어가야지 이어지는 양태적인 연속을 통해
            긍정적이라면, 가설적으로:
          </p>
          <ul>
            <li>
              (가설) 피크가 초기 상승만 열고, 비교적 정체된 소비자 유입이
              따라오므로 피크를 보면서도 고점에서 나쁘지 않은 구매 흐름이 지속됨
            </li>
            <li>
              (가설) 감상 속에서 온라인으로 구매하거나, 트렌드 피크에서 충분히
              자금이 충분 된 제품을 구매하는 양태. 이 관점에서 트렌드의 피크와 주가
              고점이 디커플링되는 타이밍이 있을 수 있음
            </li>
          </ul>
        </Section>

        <Section title="Hoka One One">
          <KeyMetric label="검색량" value="구글트렌드 100 도달" />
          <KeyMetric label="실적 발표" value="모회사 DECK 24.1Q부터 반등" />
          <KeyMetric
            label="주가 고점 시차"
            value="구글트렌드 대비 약 3분기 후행"
          />

          <ul className="mt-4">
            <li>
              검색량: 구글트렌드 기준 HOKA의 검색량은 23.4Q에 절대 분기기 처음
              하락했고, 24.1Q/2Q/3Q에서 트렌드는 확실히 플랫으로 전환
            </li>
            <li>
              실적 관점: 구글트렌드가 23년 고점이므로 yoy 기준으로 가장 가기 힘든
              시기. 구글트렌드가 고점 2020-2021기, 월리사이어 4Q에 가면서 yoy
              둔화에서 트렌드가 2022-2023년 초와 비슷한 수준 정도에서 반전하고,
              이러한 시점서 3분기 후행하는 주가의 고점으로 가는 것이 2024-2025년이
              아닐까?
            </li>
            <li>
              실제로 24.1Q부터 Wholesale 매출이 반등하는 모양새인 것 같기도.
              호카의 케이스에서 트래픽 고점→주가(매출 yoy) 간 시계열은 약 3분기
              가량으로 나타남
            </li>
          </ul>
        </Section>

        <Section title="시사점">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-4">
            <p className="text-amber-900 font-medium mb-2">핵심 인사이트</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              아마 당시의 매크로 환경에 따라 크게 달라질 민한 요인이긴 하지만
              전체적인 흐름은 비슷하지 않을지? 다른 소비재들도 해보면 재밌을 듯.
            </p>
          </div>

          <p>
            HOKA 한 케이스 재미있는 회사에서 24년도 단계 주문을 시도하여 보면
            좋을 것.
          </p>
        </Section>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4 pb-2 border-b border-zinc-200">
        {title}
      </h2>
      <div className="text-zinc-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function KeyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-zinc-50 rounded-lg px-4 py-2 mr-3 mb-2">
      <span className="text-xs text-zinc-500 font-medium">{label}</span>
      <span className="text-sm text-zinc-900 font-semibold">{value}</span>
    </div>
  );
}
