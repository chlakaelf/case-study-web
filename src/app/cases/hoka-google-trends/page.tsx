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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">
          Hoka/ 소비재 실적·구글트렌드의 시사
        </h1>
        <p className="text-base text-zinc-500">
          트렌드·실적 간 고점의 딜레이는 약 3Q. 소비자들이 오프라인으로 접하고
          구매 패턴 파급.
        </p>
      </header>

      <div className="space-y-10">
        {/* ─── 구글트렌드와 소비재 실적 간 시차 ─── */}
        <Section title="구글트렌드와 소비재 실적 간 시차가 존재하는 이유에 대해 생각해봄">
          <p>
            신규 제품을 1차적으로 접하는 것은 1) 일단 이른 아답터 2) 딥한
            아답터들의 영향권 추가 구매 유입 3) 그 고점에서 보고 경험 후 구매로의
            수요까지. 구글트렌드에서의 &quot;가장 보편적 다수&quot;의 유입이 각
            단계의 그 사이에 걸쳐있다고 볼 수 있고, 그래서 트렌드 고점에서 실적
            고점까지는 범위를 놓으면 약 3Q 구간에서 해당 시차가 존재한다고 추정.
          </p>
          <p>
            1) 트래킹 데이터에서 실질적 구매 다수의 유입 시점이 가장 트래픽이
            활발한 단계로부터 유입이 상당수, 2) 구글트렌드에서 실적 트래킹이
            상승하면서 실적 반영에 이르기까지 약 3Q 정도의 딜레이가 존재한다고
            추정.
          </p>
        </Section>

        {/* ─── 가설 ─── */}
        <Section title="가설">
          <p>
            트래픽을 고점을 보고 단기 &quot;확산 → 소비&quot;를 관계에서 파는
            것은 트레이딩이 되는 날리기이고, 시리즈의 확장을 통한 소비자
            다각화를 통해 트렌드의 늘어남, 즉 플리어 이어가야지 이어지는
            양태적인 연속을 통해 긍정적이라면, 가설적으로:
          </p>
          <p>
            (가설) 피크가 초기 상승만 열고, 비교적 정체된 소비자 유입이
            따라오므로 피크를 보면서도 고점에서 나쁘지 않은 구매 흐름이 지속됨
          </p>
          <p>
            (가설) 감상 속에서 온라인으로 구매하거나, 트렌드 피크에서 충분히
            자금이 충분 된 제품을 구매하는 양태. 이 관점에서 트렌드의 피크와
            주가 고점이 디커플링되는 타이밍이 있을 수 있음
          </p>
        </Section>

        {/* ─── Hoka One One ─── */}
        <Section title="Hoka One One">
          <ul className="space-y-3">
            <li>
              <strong>검색량:</strong> 구글트렌드 기준 HOKA의 검색량은 23.4Q에
              절대 분기 기준 처음으로 하락하였고, yoy 기준으로는 24.1Q/2Q/3Q에서
              트렌드는 확실히 플랫으로 전환. 분명한 관점.
            </li>
            <li>
              <strong>실적 관점:</strong> 구글트렌드가 23년 고점이므로 yoy
              기준으로 가장 가기 힘든 시기. 구글트렌드가 고점 2020-2021기,
              월리사이어 4Q에 가면서 yoy 둔화에서 트렌드가 2022-2023년 초와
              비슷한 수준 정도에서 반전하고, 이러한 시점서 3분기 후행하는 주가의
              고점으로 가는 것이 2024-2025년이 아닐까?
            </li>
          </ul>
        </Section>

        {/* ─── 차트 1: 주가 · 구글트렌드 ─── */}
        <StockTrendChart />

        {/* ─── 차트 사이 코멘트 ─── */}
        <div className="text-zinc-700 leading-relaxed space-y-3">
          <p>
            실제로 24.1Q부터 Wholesale 매출이 반등하는 모양새인 것 같기도.
            호카의 케이스에서 트래픽 고점→주가(매출 yoy) 간 시계열은 약 3분기
            가량으로 나타남. 아마 당시의 매크로 환경에 따라 크게 달라질 민한
            요인이긴 하지만 전체적인 흐름은 비슷하지 않을지? 다른 소비재들도
            해보면 재밌을 듯.
          </p>
        </div>

        {/* ─── 차트 2: Wholesale-D2C Revenue ─── */}
        <HokaRevenueChart />

        {/* ─── 추가 메모 ─── */}
        <div className="text-zinc-600 text-sm leading-relaxed space-y-2 border-t border-zinc-200 pt-6">
          <p>
            (사족으로 한국 재미있는 회사에서 24년도 단체 HOKA 단체 주문을
            시도.)
          </p>
        </div>
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
    <section>
      <h2 className="text-lg font-semibold text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
        {title}
      </h2>
      <div className="text-zinc-700 text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
