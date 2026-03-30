"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, caseStudies } from "@/data/case-studies";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = caseStudies.filter((cs) => {
    const matchesCategory =
      activeCategory === "all" ||
      cs.tags.includes(activeCategory as (typeof categories)[number]);

    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      cs.title.toLowerCase().includes(q) ||
      cs.subtitle.toLowerCase().includes(q) ||
      cs.summary.toLowerCase().includes(q) ||
      cs.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="제목, 내용 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-300 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

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
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
