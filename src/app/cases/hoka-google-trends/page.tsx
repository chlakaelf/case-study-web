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
          Hoka/ 소비재 실적-구글트렌드의 시차
        </h1>
        <p className="text-base text-zinc-500">
          트렌드-실적 간 고점의 텀은 약 3Q, 소비자들이 오프라인으로 접하고
          구매할 때가 고점.
        </p>
      </header>

      <div className="space-y-10">
        {/* ─── 도입부 ─── */}
        <Section title="구글트렌드와 소비재 실적 간 시간차가 존재하는 이유에 대해 생각해봄">
          <p>
            모든 제품들은 1) 얼리 어답터 유입, 2) 얼리 어답터들의 영향으로 추가
            고객 유입, 3) 그 고객을 보고 가장 보수적인 고객군(소비재에서는
            &apos;가장 덜 트렌디한&apos;)이 유입되는 세 단계로 그 사이클이
            형성된다고 볼 수 있음.
          </p>
          <p>
            여기서 소비재로 그 범위를 좁히면 <strong>2) 구간에서는 트래픽과
            매출이 같이 성장</strong>, <strong>3) 구간에서는 트래픽은 정체하지만
            매출 성장폭은 다시 확대</strong>되는 흐름을 보이는데, 이 부분에 대한
            가설을 두 가지 세워봤음.
          </p>
        </Section>

        {/* ─── 가설 ─── */}
        <Section title="가설">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-zinc-800 mb-1">가설 1)</p>
              <p>
                트래픽의 고점을 보고 드디어 &apos;확신&apos;을 가진 소매점들은
                관련 제품의 재고를 폭발적으로 늘리게 됨. 시계열을 좀 더 미래로
                늘리면, 물건이 풀리면서 아이러니하게 그 제품의 가치는 떨어지는
                흐름으로 이어짐(주식과 비슷..).
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 mb-1">가설 2)</p>
              <p>
                패피가 초기 시장을 열고, 비교적 젊은 소비자들이 이를 따라하고,
                아저씨들이 젊은이들을 보고 따라사는 흐름을 거치는데,
                이들(아저씨)은 &apos;검색&apos;을 통해(혹은 온라인으로) 제품을
                구매하기 보다는 매장에 방문하여 한 박자 늦게 공급이 충분히 풀린
                제품들을 구매하게 됨. 이 과정에서 트래픽은 고정, 매출은
                상승(회사에서 HOKA를 단체주문 하는 것과 같은 맥락).
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Hoka One One ─── */}
        <Section title="Hoka One One">
          <ul className="list-disc list-outside ml-5 space-y-3">
            <li>
              검색어: 구글트렌드 Hoka One One(주제)
            </li>
            <li>
              유의미하게 구글트렌드가 yoy 성장을 보였던 분기는 23.4Q가 마지막,
              24.1Q/2Q/3Q에는 트렌드 측면의 큰 발전은 없었고 유지되는 수준이었으나
              오히려 매출 yoy는 더 증가, 주가도 이때 고점을 형성.
            </li>
            <li>
              얼리어답터들이 진입한 구간은 2020-2021년, 얼리어답터들을 보고
              일반인들이 유입되는 구간이 2022-2023년, 일반인들이 신는 것을 보고
              가장 &apos;덜 트렌디한&apos; 고객군이 진입하여 더이상 트렌디한
              상품이 아니게 되는 시점이 2024-2025년 아닐지?
            </li>
            <li className="text-zinc-500 text-sm">
              (실제로 현재 재직중인 회사에서 24년 말 HOKA 단체 주문을 시도.)
            </li>
          </ul>
        </Section>

        {/* ─── 차트 1: 주가 · 구글트렌드 · 매출 YoY ─── */}
        <StockTrendChart />

        {/* ─── 차트 사이 코멘트 ─── */}
        <div className="text-zinc-700 text-[15px] leading-relaxed">
          <p>
            실제로 24.1Q부터 Wholesale 매출이 반등하는 모양새인 것 같기도.
            호카의 케이스에서 트래픽 고점-주가(매출 yoy) 간 시계열은 약 3분기
            가량으로 나타남. 아마 당시의 매크로 환경에 따라 크게 달라질 만한
            요인이긴 하지만 전체적인 흐름은 비슷하지 않을지? 다른 소비재들도
            해보면 재밌을 듯.
          </p>
        </div>

        {/* ─── 차트 2: Wholesale-D2C Revenue ─── */}
        <HokaRevenueChart />
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
