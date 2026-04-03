"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useAdmin } from "./AdminProvider";
import { StockTrendChart, HokaRevenueChart } from "./HokaCharts";
import { PQDecompositionChart, StockRevenueChart } from "./ImpinjCharts";

const CHART_COMPONENTS: Record<string, React.ComponentType<{ title?: string; subtitle?: string }>> = {
  stockTrend: StockTrendChart,
  revenue: HokaRevenueChart,
  pqDecomposition: PQDecompositionChart,
  stockRevenue: StockRevenueChart,
};

interface Section {
  id: string;
  title: string | null;
  type: "paragraphs" | "bullets" | "items";
  content: string[] | { label: string; text: string }[];
}

export interface ChartMeta {
  title: string;
  subtitle: string;
}

export interface ArticleContent {
  title: string;
  subtitle: string;
  tags: string[];
  summary?: string;
  date?: string;
  charts?: Record<string, ChartMeta>;
  sections: Section[];
}

interface Props {
  content: ArticleContent;
  slug: string;
  chartSlots: { afterSectionIndex: number; chartKey: string; component: string }[];
}

const FONT_SIZES = ["12px", "13px", "14px", "15px", "16px", "18px", "20px", "24px"];
const COLORS = [
  { label: "Default", value: "" },
  { label: "Black", value: "#171717" },
  { label: "Gray", value: "#71717a" },
  { label: "Red", value: "#dc2626" },
  { label: "Blue", value: "#2563eb" },
  { label: "Green", value: "#16a34a" },
  { label: "Orange", value: "#ea580c" },
];

function RichTextToolbar() {
  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-white border border-zinc-200 rounded-xl shadow-lg px-3 py-2 flex items-center gap-1 flex-wrap">
      <button
        onMouseDown={(e) => { e.preventDefault(); exec("bold"); }}
        className="px-2 py-1 text-sm font-bold rounded hover:bg-zinc-100"
        title="Bold"
      >
        B
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); exec("italic"); }}
        className="px-2 py-1 text-sm italic rounded hover:bg-zinc-100"
        title="Italic"
      >
        I
      </button>
      <button
        onMouseDown={(e) => { e.preventDefault(); exec("underline"); }}
        className="px-2 py-1 text-sm underline rounded hover:bg-zinc-100"
        title="Underline"
      >
        U
      </button>
      <div className="w-px h-5 bg-zinc-200 mx-1" />
      <select
        onChange={(e) => { exec("fontSize", "1"); requestAnimationFrame(() => { const els = document.querySelectorAll('font[size="1"]'); els.forEach((el) => { (el as HTMLElement).removeAttribute("size"); (el as HTMLElement).style.fontSize = e.target.value; }); }); }}
        className="text-xs border border-zinc-200 rounded px-1 py-1 bg-white"
        defaultValue=""
        title="Font Size"
      >
        <option value="" disabled>Size</option>
        {FONT_SIZES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="w-px h-5 bg-zinc-200 mx-1" />
      {COLORS.map((c) => (
        <button
          key={c.value || "default"}
          onMouseDown={(e) => {
            e.preventDefault();
            if (c.value) {
              exec("foreColor", c.value);
            } else {
              exec("removeFormat");
            }
          }}
          className="w-5 h-5 rounded-full border border-zinc-300 hover:scale-110 transition-transform"
          style={{ backgroundColor: c.value || "#fff" }}
          title={c.label}
        />
      ))}
      <div className="w-px h-5 bg-zinc-200 mx-1" />
      <button
        onMouseDown={(e) => { e.preventDefault(); exec("removeFormat"); }}
        className="px-2 py-1 text-xs rounded hover:bg-zinc-100 text-zinc-500"
        title="Clear Formatting"
      >
        Clear
      </button>
    </div>
  );
}

export function EditableArticle({ content: initialContent, slug, chartSlots }: Props) {
  const { isAdmin, password } = useAdmin();
  const [content, setContent] = useState<ArticleContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const hasChanges = useRef(false);

  // Reset content when entering/leaving admin mode
  useEffect(() => {
    if (!isAdmin) setContent(initialContent);
  }, [isAdmin, initialContent]);

  const updateField = useCallback((path: string, value: string) => {
    hasChanges.current = true;
    setSaveStatus("idle");
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>;
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, slug, content }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        hasChanges.current = false;
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
    setSaving(false);
  };

  const richEditableProps = (path: string, currentValue: string) =>
    isAdmin
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          dangerouslySetInnerHTML: { __html: currentValue },
          onBlur: (e: React.FocusEvent<HTMLElement>) => {
            const newVal = e.currentTarget.innerHTML;
            if (newVal !== currentValue) {
              updateField(path, newVal);
            }
          },
          className: "outline-none ring-1 ring-blue-200 rounded px-1 -mx-1 focus:ring-blue-400 min-h-[1.5em]",
        }
      : {
          dangerouslySetInnerHTML: { __html: currentValue },
        };

  const plainEditableProps = (path: string, currentValue: string) =>
    isAdmin
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: (e: React.FocusEvent<HTMLElement>) => {
            const newVal = e.currentTarget.textContent || "";
            if (newVal !== currentValue) {
              updateField(path, newVal);
            }
          },
          className: "outline-none ring-1 ring-blue-200 rounded px-1 -mx-1 focus:ring-blue-400",
          children: currentValue,
        }
      : { children: currentValue };

  const chartMap = new Map(chartSlots.map((s) => {
    const meta = content.charts?.[s.chartKey];
    return [s.afterSectionIndex, {
      chartKey: s.chartKey,
      component: s.component,
      title: meta?.title || "",
      subtitle: meta?.subtitle || "",
    }];
  }));

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {isAdmin && <RichTextToolbar />}

      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-8"
      >
        &larr; 전체 케이스
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {isAdmin && (
            <input
              type="text"
              value={content.tags.join(", ")}
              onChange={(e) => {
                const newTags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                hasChanges.current = true;
                setSaveStatus("idle");
                setContent((prev) => ({ ...prev, tags: newTags }));
              }}
              className="ml-2 px-2 py-0.5 text-xs border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
              placeholder="태그 (쉼표 구분)"
            />
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">
          <span {...plainEditableProps("title", content.title)} />
        </h1>
        <p className="text-base text-zinc-500">
          <span {...plainEditableProps("subtitle", content.subtitle)} />
        </p>
      </header>

      <div className="space-y-16">
        {content.sections.map((section, si) => (
          <div key={section.id}>
            <section>
              {section.title && (
                <h2 className="text-lg font-semibold text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                  <span {...plainEditableProps(`sections.${si}.title`, section.title)} />
                </h2>
              )}
              <div className="text-zinc-700 text-[15px] leading-relaxed space-y-3">
                {section.type === "paragraphs" &&
                  (section.content as string[]).map((p, pi) => (
                    <p key={pi}>
                      <span {...richEditableProps(`sections.${si}.content.${pi}`, p)} />
                    </p>
                  ))}

                {section.type === "items" && (
                  <div className="space-y-4">
                    {(section.content as { label: string; text: string }[]).map((item, ii) => (
                      <div key={ii}>
                        <p className="font-medium text-zinc-800 mb-1">
                          <span {...plainEditableProps(`sections.${si}.content.${ii}.label`, item.label)} />
                        </p>
                        <p>
                          <span {...richEditableProps(`sections.${si}.content.${ii}.text`, item.text)} />
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "bullets" && (
                  <ul className="list-disc list-outside ml-5 space-y-3">
                    {(section.content as string[]).map((b, bi) => (
                      <li
                        key={bi}
                        className={bi === (section.content as string[]).length - 1 ? "text-zinc-500 text-sm" : ""}
                      >
                        <span {...richEditableProps(`sections.${si}.content.${bi}`, b)} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {chartMap.has(si) && (() => {
              const c = chartMap.get(si)!;
              const ChartComp = CHART_COMPONENTS[c.component];
              if (!ChartComp) return null;
              return (
                <div>
                  {isAdmin && (
                    <div className="mt-4 mb-2 space-y-1">
                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) => updateField(`charts.${c.chartKey}.title`, e.target.value)}
                        className="w-full px-2 py-1 text-base font-semibold text-zinc-800 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Chart title"
                      />
                      <input
                        type="text"
                        value={c.subtitle}
                        onChange={(e) => updateField(`charts.${c.chartKey}.subtitle`, e.target.value)}
                        className="w-full px-2 py-1 text-xs text-zinc-400 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Chart subtitle"
                      />
                    </div>
                  )}
                  <ChartComp title={c.title} subtitle={c.subtitle} />
                </div>
              );
            })()}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-3 flex items-center justify-center gap-3 z-40">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save & Deploy"}
          </button>
          {saveStatus === "saved" && (
            <span className="text-sm text-green-600">Saved — deploying...</span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm text-red-500">Save failed</span>
          )}
        </div>
      )}
    </article>
  );
}
