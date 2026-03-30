// ============================================
// 카테고리와 케이스스터디 데이터
// 여기서 직접 추가/수정/삭제하면 사이트에 반영됩니다
// ============================================

// 카테고리 목록 — 원하는 대로 추가/삭제/순서 변경 가능
export const categories = [
  "트렌드",
  "소비재",
  "DECK"
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
    title: "DECK: 소비재 실적과 구글 트렌드의 시계열",
    subtitle: "HOKA One One을 중심으로",
    tags: ["트렌드", "소비재", "DECK"],
    summary:
      "구글트렌드 고점에서 실적·주가 고점까지 약 3~5분기 시차 존재. HOKA 케이스를 통해 소비재의 트렌드-실적 디커플링 구간을 분석.",
    date: "21.4Q ~ 25.1Q",
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
