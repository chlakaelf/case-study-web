import { EditableArticle, type ArticleContent } from "@/components/EditableArticle";
import rawContent from "@/data/articles/impinj-pq.json";

const content = rawContent as ArticleContent;

export default function ImpinjCaseStudy() {
  return (
    <EditableArticle
      content={content}
      slug="impinj-pq"
      chartSlots={[
        { afterSectionIndex: 2, chartKey: "pqDecomposition", component: "pqDecomposition" },
        { afterSectionIndex: 3, chartKey: "stockRevenue", component: "stockRevenue" },
      ]}
    />
  );
}
