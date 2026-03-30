"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, caseStudies } from "@/data/case-studies";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? caseStudies
      : caseStudies.filter((cs) =>
          cs.tags.includes(activeCategory as (typeof categories)[number])
        );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-3">
          Case Study
        </h1>
        <p className="text-zinc-500 text-lg">
          기업이 아닌 사례 중심으로 정리한 투자 분석 모음
        </p>
      </section>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((cs) => (
          <Link
            key={cs.slug}
            href={`/cases/${cs.slug}`}
            className="group block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
              {cs.title}
            </h2>
            <p className="text-sm text-zinc-500 mb-3">{cs.subtitle}</p>
            <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
              {cs.summary}
            </p>
            <div className="mt-4 text-xs text-zinc-400">{cs.date}</div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-zinc-400 py-12">
          해당 카테고리에 케이스가 없습니다.
        </p>
      )}
    </div>
  );
}
