// ============================================
// 카테고리와 케이스스터디 데이터
// 여기서 직접 추가/수정/삭제하면 사이트에 반영됩니다
// ============================================

// 카테고리 목록 — 원하는 대로 추가/삭제/순서 변경 가능
export const categories = [
  "구글트렌드",
  "소비재",
  "D2C",
  "사이클",
  "매크로",
  "밸류에이션",
] as const;

export type Category = (typeof categories)[number];

// 케이스스터디 목록
export interface CaseStudy {
  slug: string; // URL 경로 (영문, 하이픈으로 구분)
  title: string; // 제목
  subtitle: string; // 부제
  tags: Category[]; // 태그 (위 categories에서 선택)
  summary: string; // 카드에 보이는 요약
  date: string; // 날짜 (YYYY-MM)
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hoka-google-trends",
    title: "소비재 실적 · 구글트렌드의 시사",
    subtitle: "HOKA One One을 중심으로",
    tags: ["구글트렌드", "소비재", "D2C"],
    summary:
      "구글트렌드와 소비재 실적 간 시차와 주가 고점-주가 구매 패턴 분석. 트렌드-실적 간 고점의 딜레이는 약 3분기, 소비자들의 오프라인으로 접하고 구매 패턴 파급.",
    date: "2026-03",
  },
  // 새 케이스 추가 예시:
  // {
  //   slug: "semiconductor-cycle",
  //   title: "반도체 사이클과 재고",
  //   subtitle: "DRAM/NAND 가격 사이클 분석",
  //   tags: ["사이클"],
  //   summary: "반도체 재고 사이클과 주가의 관계...",
  //   date: "2026-04",
  // },
];
