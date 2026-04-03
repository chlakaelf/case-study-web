"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useAdmin } from "./AdminProvider";

interface Section {
  id: string;
  title: string | null;
  type: "paragraphs" | "bullets" | "items";
  content: string[] | { label: string; text: string }[];
}

export interface ArticleContent {
  title: string;
  subtitle: string;
  tags: string[];
  sections: Section[];
}

interface Props {
  content: ArticleContent;
  slug: string;
  chartSlots: { afterSectionIndex: number; element: React.ReactNode }[];
}

export function EditableArticle({ content: initialContent, slug, chartSlots }: Props) {
  const { isAdmin, password } = useAdmin();
  const [content, setContent] = useState<ArticleContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const hasChanges = useRef(false);

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

  const editableProps = (path: string, currentValue: string) =>
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
        }
      : {};

  const chartMap = new Map(chartSlots.map((s) => [s.afterSectionIndex, s.element]));

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
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">
          <span {...editableProps("title", content.title)}>{content.title}</span>
        </h1>
        <p className="text-base text-zinc-500">
          <span {...editableProps("subtitle", content.subtitle)}>{content.subtitle}</span>
        </p>
      </header>

      <div className="space-y-16">
        {content.sections.map((section, si) => (
          <div key={section.id}>
            <section>
              {section.title && (
                <h2 className="text-lg font-semibold text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
                  <span {...editableProps(`sections.${si}.title`, section.title)}>
                    {section.title}
                  </span>
                </h2>
              )}
              <div className="text-zinc-700 text-[15px] leading-relaxed space-y-3">
                {section.type === "paragraphs" &&
                  (section.content as string[]).map((p, pi) => (
                    <p key={pi}>
                      {isAdmin ? (
                        <span {...editableProps(`sections.${si}.content.${pi}`, p)}>{p}</span>
                      ) : (
                        <span dangerouslySetInnerHTML={{ __html: p }} />
                      )}
                    </p>
                  ))}

                {section.type === "items" && (
                  <div className="space-y-4">
                    {(section.content as { label: string; text: string }[]).map((item, ii) => (
                      <div key={ii}>
                        <p className="font-medium text-zinc-800 mb-1">
                          <span {...editableProps(`sections.${si}.content.${ii}.label`, item.label)}>
                            {item.label}
                          </span>
                        </p>
                        <p>
                          <span {...editableProps(`sections.${si}.content.${ii}.text`, item.text)}>
                            {item.text}
                          </span>
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
                        <span {...editableProps(`sections.${si}.content.${bi}`, b)}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {chartMap.get(si)}
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
