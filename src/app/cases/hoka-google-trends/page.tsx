import { EditableArticle, type ArticleContent } from "@/components/EditableArticle";
import rawContent from "@/data/articles/hoka-google-trends.json";

const content = rawContent as ArticleContent;

export default function HokaCaseStudy() {
  return (
    <EditableArticle
      content={content}
      slug="hoka-google-trends"
      chartSlots={[
        { afterSectionIndex: 2, chartKey: "stockTrend", component: "stockTrend" },
        { afterSectionIndex: 3, chartKey: "revenue", component: "revenue" },
      ]}
    />
  );
}
