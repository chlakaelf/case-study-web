import Link from "next/link";
import { HokaRevenueChart, StockTrendChart } from "@/components/HokaCharts";

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
          {["트렌드", "소비재", "DECK"].map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
          Hoka/ 소비재 실적 · 구글트렌드의 시사
        </h1>
        <p className="text-lg text-zinc-500">
          트렌드·실적 간 고점의 딜레이는 약 3Q. 소비자들이 오프라인으로 접하고
          구매를 거치는 시차
        </p>
        <div className="mt-4 text-sm text-zinc-400">2026년 3월</div>
      </header>

      <div className="space-y-10">
        {/* ─── 섹션 1: 구글트렌드와 소비재 실적 간 시차 ─── */}
        <Section title="구글트렌드와 소비재 실적 간 시차가 존재하는 이유에 대해">
          <p>
            모든 제품을 1) 1차적으로 접하는 것은 일단 얼리 아답터 2) 딥한
            아답터들의 영향권 추가 구매 유입 3) 그 고점에서 보고 경험 후 구매로의
            수요까지 — 권리(소비재에서의 &quot;가장 보편적 다수&quot;)의 유입이 각
            단계의 그 사이에 걸쳐있다고 볼 수 있고, 그래서 트렌드 고점에서 실적
            고점까지는 범위를 놓으면 약 3Q 구간에서 해당 시차가 존재한다고 추정할
            수 있다.
          </p>

          <ol className="list-decimal list-inside space-y-2 mt-4 text-zinc-700">
            <li>
              트래킹 데이터에서 실질적 &quot;가장 다수 소비자&quot;의 구매 유입
              시점이 1) 구글트렌드에서 트래픽 고점을 보고 2) 온/오프 혼합 구매
              까지에서의 매출 파급 시차가 존재
            </li>
            <li>
              크게 검색 이후 유입되는 것은 트렌드가 된다고 할 때 그 사이에서
              형성이라고 보는 것이 합리적
            </li>
            <li>
              구글트렌드에서 실적 트래킹이 상승하면서 실적반영에 이르는 시차를
              감안, 실질적으로 구매에 반영되기까지 3Q 추정
            </li>
          </ol>
        </Section>

        {/* ─── 섹션 2: 가설 ─── */}
        <Section title="가설: 트래픽 고점을 보고 디커플링이 가능한 시차">
          <p>
            트래픽을 고점을 보고 단기적 &quot;확산 → 소비&quot; 관계에서 파는 것은
            트레이딩이 되는 날리기이고, 시리즈의 확장을 통한 소비자의 다각화를
            통해 트렌드가 늘어남 — 즉, 플리어 이어가야지 이어지는 양태적 연속을
            통해 긍정적이라면:
          </p>

          <div className="bg-zinc-50 rounded-xl p-5 mt-4 space-y-4">
            <div>
              <p className="font-medium text-zinc-800 mb-1">
                가설 1) 피크 이후에도 구매 흐름 지속
              </p>
              <p className="text-sm text-zinc-600">
                피크가 초기 상승만 열고, 비교적 정체된 소비자 유입이 따라오므로
                피크를 보면서도 고점에서 나쁘지 않은 매출 흐름이 지속된다. 베스트
                이후라고 해서 펜이 아니라 소비자가 아직 따라오는 단계의
                매출이므로, 절대금은 물론이고 이면에서 판매가 충분히 지속.
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 mb-1">
                가설 2) 온라인 구매와 트렌드 피크의 디커플링
              </p>
              <p className="text-sm text-zinc-600">
                감상 속에서 온라인으로 구매하거나, 트렌드 피크에서 충분히 자금을
                동반해 제품을 구매하는 양태. 이 관점에서 트렌드의 피크와 주가
                고점이 디커플링되는 타이밍이 있을 수 있으며, 이 관점에서
                트렌드에서 실적 반영 시차가 크게 벌어지는 HOKA 같은 케이스가
                재미있다.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── 섹션 3: Hoka One One 분석 ─── */}
        <Section title="Hoka One One">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <KeyMetric label="모회사" value="Deckers (DECK)" />
            <KeyMetric label="구글트렌드 고점" value="23.3Q (100)" />
            <KeyMetric label="주가 고점" value="24.4Q ($203)" />
          </div>

          <div className="space-y-3 text-zinc-700">
            <p>
              <strong>검색량:</strong> 구글트렌드 기준 &quot;HOKA&quot;의
              검색량은 23.4Q에 절대 분기 기준 처음 하락했고,
              24.1Q/2Q/3Q에서 트렌드는 확실히 플랫으로 전환. 구글트렌드
              피크는 23년 3분기(100)이며, 이후 점진적 하락세.
            </p>
            <p>
              <strong>실적 관점:</strong> 구글트렌드가 23년에 고점을 찍었으므로
              yoy 기준으로 가장 가기 힘든 시기가 24년도. 실제 HOKA의 분기
              매출 yoy 성장률은 FY2023(22.2Q~23.1Q)에 40~91%이던 것이
              FY2024(23.2Q~24.1Q)에는 20~38%로 둔화. 하지만 절대 매출은 여전히
              상승 — 트렌드 고점과 매출 고점의 시차를 보여주는 전형적 패턴.
            </p>
            <p>
              <strong>주가:</strong> DECK 주가는 구글트렌드 고점(23.3Q)
              이후에도 계속 상승하여 24.4Q에 $203으로 고점을 기록. 트렌드
              고점 대비 약 5분기 후행. 이후 25.1Q에 $112로 급락 — 매출 yoy
              둔화(+10%)가 본격 반영된 시점.
            </p>
            <p>
              <strong>채널 믹스:</strong> 실제로 24.1Q부터 Wholesale 매출이
              반등하는 모양새. D2C 비중은 FY2023 ~34%에서 FY2025 ~37%로 꾸준히
              확대되었으나, FY2025 Q4에는 D2C 성장이 +3%로 급격히 둔화하며
              Wholesale이 성장을 주도하는 구조 전환.
            </p>
          </div>

          <StockTrendChart />
          <HokaRevenueChart />
        </Section>

        {/* ─── 섹션 4: 시사점 ─── */}
        <Section title="시사점">
          <p>
            실제로 24.1Q부터 Wholesale 매출이 반등하는 모양새인 것 같기도.
            호카의 케이스에서 트래픽 고점 → 주가(매출 yoy) 간 시계열은 약
            3분기~5분기 가량으로 나타남. 아마 당시의 매크로 환경에 따라 크게
            달라질 민한 요인이긴 하지만 전체적인 흐름은 비슷하지 않을지?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
            <p className="text-amber-900 font-medium mb-2">핵심 인사이트</p>
            <ul className="text-amber-800 text-sm leading-relaxed space-y-2">
              <li>
                구글트렌드 고점(23.3Q) → 매출 yoy 고점(~22.4Q, 선행) → 주가
                고점(24.4Q, 후행) 순서. 트렌드가 꺾여도 절대 매출은 계속 성장하므로
                주가는 한참 뒤에 반응.
              </li>
              <li>
                주가가 트렌드 대비 후행하는 핵심 이유: 소비자 구매 파이프라인의
                시차. 얼리 아답터 → 매스 소비자 → 오프라인 확산까지 3Q+ 소요.
              </li>
              <li>
                다른 소비재들도 해보면 재밌을 듯. 동일 프레임워크(구글트렌드
                고점 → 실적 반영 → 주가 반응)를 Crocs, On Running, Birkenstock
                등에 적용해볼 수 있음.
              </li>
            </ul>
          </div>

          <div className="bg-zinc-50 rounded-xl p-5">
            <p className="text-zinc-700 font-medium mb-2">추가 검증 포인트</p>
            <ul className="text-zinc-600 text-sm space-y-1">
              <li>
                - HOKA의 FY2025 Q4 D2C 성장률이 +3%로 급락 — 트렌드 하락이
                본격적으로 D2C 채널에 먼저 반영되는 패턴인지 확인
              </li>
              <li>
                - 현재 DECK 주가($94, 26년 3월) vs 고점($203, 24.4Q) — 약 54%
                하락. 트렌드 하락 → 매출 둔화 → 주가 조정의 전체 사이클 관찰 가능
              </li>
              <li>
                - 한 회사 재미있는 회사에서 24년도 단계 주문을 시도해보면 좋을 것
              </li>
            </ul>
          </div>
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
    <section className="mb-2">
      <h2 className="text-xl font-semibold text-zinc-900 mb-4 pb-2 border-b border-zinc-200">
        {title}
      </h2>
      <div className="text-zinc-700 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function KeyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-zinc-50 rounded-lg px-4 py-3">
      <span className="text-xs text-zinc-500 font-medium mb-1">{label}</span>
      <span className="text-sm text-zinc-900 font-semibold">{value}</span>
    </div>
  );
}
