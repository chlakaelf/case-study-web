import hokaContent from "./articles/hoka-google-trends.json";
import impinjContent from "./articles/impinj-pq.json";

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
  {
    slug: "impinj-pq",
    title: impinjContent.title,
    subtitle: impinjContent.subtitle,
    tags: impinjContent.tags,
    summary: impinjContent.summary,
    date: impinjContent.date,
  },
];

// Derive categories from all tags across case studies
export const categories = [...new Set(caseStudies.flatMap((cs) => cs.tags))];
