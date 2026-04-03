import hokaContent from "./articles/hoka-google-trends.json";

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  date: string;
}

// Build case studies list from article JSON files
export const caseStudies: CaseStudy[] = [
  {
    slug: "hoka-google-trends",
    title: hokaContent.title,
    subtitle: hokaContent.subtitle,
    tags: hokaContent.tags,
    summary: hokaContent.summary,
    date: hokaContent.date,
  },
];

// Derive categories from all tags across case studies
export const categories = [...new Set(caseStudies.flatMap((cs) => cs.tags))];
