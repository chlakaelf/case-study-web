import { EditableArticle, type ArticleContent } from "@/components/EditableArticle";
import { StockTrendChart, HokaRevenueChart } from "@/components/HokaCharts";
import rawContent from "@/data/articles/hoka-google-trends.json";

const content = rawContent as ArticleContent;

export default function HokaCaseStudy() {
  return (
    <EditableArticle
      content={content}
      slug="hoka-google-trends"
      chartSlots={[
        { afterSectionIndex: 2, element: <StockTrendChart /> },
        { afterSectionIndex: 3, element: <HokaRevenueChart /> },
      ]}
    />
  );
}
