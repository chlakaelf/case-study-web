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
          Hoka/ 소비재 실적과 구글트렌드 사이의 시차
        </h1>
        <p className="text-base text-zinc-500">
          트렌드-실적 간 고점의 텀은 약 3분기. 소비자들이 오프라인에서 접하고
          구매하는 시점이 실적의 고점이다.
        </p>
      </header>

      <div className="space-y-10">
        {/* ─── 도입부 ─── */}
        <Section title="구글트렌드와 소비재 실적 간 시간차의 원인">
          <p>
            모든 제품은 세 단계의 소비자 유입 사이클을 거친다. 1) 얼리 어답터의
            유입, 2) 얼리 어답터의 영향으로 추가 고객이 유입되는 단계, 3) 이
            고객들을 보고 가장 보수적인 고객군 — 소비재에서는 &apos;가장 덜
            트렌디한&apos; 소비자 — 이 진입하는 단계다.
          </p>
          <p>
            소비재로 범위를 좁히면 흥미로운 패턴이 나타난다.{" "}
            <strong>
              2) 구간에서는 트래픽과 매출이 함께 성장하지만, 3) 구간에서는
              트래픽은 정체하는 반면 매출 성장폭은 오히려 다시 확대된다.
            </strong>{" "}
            이 괴리에 대해 두 가지 가설을 세웠다.
          </p>
        </Section>

        {/* ─── 가설 ─── */}
        <Section title="두 가지 가설">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-zinc-800 mb-1">
                가설 1 — 소매점의 확신과 재고 확대
              </p>
              <p>
                트래픽이 고점을 찍으면, 소매점들은 드디어 &apos;확신&apos;을 갖고
                관련 제품의 재고를 폭발적으로 늘린다. 그러나 시계열을 조금 더
                미래로 확장하면, 물건이 풀리면서 아이러니하게도 제품의 희소
                가치는 떨어지는 흐름으로 이어진다. 주식의 수급 논리와 닮아
                있다.
              </p>
            </div>
            <div>
              <p className="font-medium text-zinc-800 mb-1">
                가설 2 — 패피에서 아저씨까지, 세대 간 시차
              </p>
              <p>
                패피가 초기 시장을 열고, 비교적 젊은 소비자들이 뒤따르고,
                최종적으로 아저씨들이 젊은이들을 보고 구매하는 흐름이다.
                이들은 &apos;검색&apos;보다는 매장 방문을 통해, 한 박자 늦게
                공급이 충분히 풀린 제품을 구매한다. 이 과정에서 트래픽은
                정체되지만 매출은 오히려 상승한다 — 회사에서 HOKA를 단체주문
                하는 것과 같은 맥락이다.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Hoka One One ─── */}
        <Section title="Hoka One One">
          <ul className="list-disc list-outside ml-5 space-y-3">
            <li>
              검색어: 구글트렌드 &apos;Hoka One One&apos;(주제) 기준.
            </li>
            <li>
              구글트렌드가 유의미한 yoy 성장을 보인 마지막 분기는 23.4Q였다.
              24.1Q/2Q/3Q에는 트렌드 측면의 성장은 멈추고 유지 수준에 그쳤으나,
              같은 기간 매출 yoy는 오히려 더 증가했고 주가 역시 이 시기에 고점을
              형성했다.
            </li>
            <li>
              얼리어답터가 진입한 구간은 2020-2021년, 이를 보고 일반인이 유입된
              구간이 2022-2023년이다. 일반인들이 신는 것을 보고 가장 &apos;덜
              트렌디한&apos; 고객군이 진입하며 더 이상 트렌디한 상품이 아니게
              되는 시점이 2024-2025년이 아닐까.
            </li>
            <li className="text-zinc-500 text-sm">
              (실제로 현재 재직 중인 회사에서 24년 말 HOKA 단체 주문을 시도했다.)
            </li>
          </ul>
        </Section>

        {/* ─── 차트 1 ─── */}
        <StockTrendChart />

        {/* ─── 차트 사이 코멘트 ─── */}
        <div className="text-zinc-700 text-[15px] leading-relaxed">
          <p>
            실제로 24.1Q부터 Wholesale 매출이 반등하는 모양새다. 호카의
            케이스에서 트래픽 고점과 주가(매출 yoy) 간 시계열은 약 3분기의
            시차로 나타난다. 당시 매크로 환경에 따라 달라질 수 있는 요인이지만,
            전체적인 흐름 자체는 유사할 가능성이 높다. 다른 소비재에도 동일한
            프레임을 적용해 보면 흥미로울 것이다.
          </p>
        </div>

        {/* ─── 차트 2 ─── */}
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
