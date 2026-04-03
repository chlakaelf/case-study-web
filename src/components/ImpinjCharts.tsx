"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Annual P/Q decomposition (from 10-K MD&A)
const pqData = [
  { year: "2017", pEffect: -3.2, qEffect: 8.7, totalChange: 5.5, stock: 22 },
  { year: "2018", pEffect: -9.1, qEffect: 2.4, totalChange: -6.7, stock: 15 },
  { year: "2019", pEffect: -3.6, qEffect: 19.5, totalChange: 12.7, stock: 26 },
  { year: "2020", pEffect: -2.3, qEffect: 7.0, totalChange: 4.7, stock: 42 },
  { year: "2021", pEffect: -7.6, qEffect: 44.5, totalChange: 36.9, stock: 89 },
  { year: "2022", pEffect: 35.5, qEffect: 16.8, totalChange: 52.3, stock: 109 },
  { year: "2023", pEffect: -26.0, qEffect: 68.9, totalChange: 42.9, stock: 90 },
  { year: "2024", pEffect: -23.2, qEffect: 79.7, totalChange: 71.5, stock: 145 },
];

// Quarterly chip revenue + monthly stock price
const quarterlyData = [
  { quarter: "17.1Q", chipRev: 20.8 },
  { quarter: "17.2Q", chipRev: 24.5 },
  { quarter: "17.3Q", chipRev: 29.0 },
  { quarter: "17.4Q", chipRev: 17.5 },
  { quarter: "18.1Q", chipRev: 19.3 },
  { quarter: "18.2Q", chipRev: 19.9 },
  { quarter: "18.3Q", chipRev: 23.7 },
  { quarter: "18.4Q", chipRev: 21.8 },
  { quarter: "19.1Q", chipRev: 21.9 },
  { quarter: "19.2Q", chipRev: 23.7 },
  { quarter: "19.3Q", chipRev: 26.4 },
  { quarter: "19.4Q", chipRev: 25.7 },
  { quarter: "20.1Q", chipRev: 33.7 },
  { quarter: "20.2Q", chipRev: 18.5 },
  { quarter: "20.3Q", chipRev: 21.6 },
  { quarter: "20.4Q", chipRev: 28.5 },
  { quarter: "21.1Q", chipRev: 38.1 },
  { quarter: "21.2Q", chipRev: 30.8 },
  { quarter: "21.3Q", chipRev: 32.0 },
  { quarter: "21.4Q", chipRev: 38.4 },
  { quarter: "22.1Q", chipRev: 38.8 },
  { quarter: "22.2Q", chipRev: 42.9 },
  { quarter: "22.3Q", chipRev: 51.2 },
  { quarter: "22.4Q", chipRev: 58.7 },
  { quarter: "23.1Q", chipRev: 67.0 },
  { quarter: "23.2Q", chipRev: 64.9 },
  { quarter: "23.3Q", chipRev: 48.6 },
  { quarter: "23.4Q", chipRev: 53.9 },
  { quarter: "24.1Q", chipRev: 61.5 },
  { quarter: "24.2Q", chipRev: 89.4 },
  { quarter: "24.3Q", chipRev: 81.0 },
  { quarter: "24.4Q", chipRev: 74.1 },
];

// Monthly stock price
const stockMonthly = [
  { month: "17.01", stock: 35 }, { month: "17.02", stock: 28 }, { month: "17.03", stock: 30 },
  { month: "17.04", stock: 37 }, { month: "17.05", stock: 44 }, { month: "17.06", stock: 49 },
  { month: "17.07", stock: 49 }, { month: "17.08", stock: 38 }, { month: "17.09", stock: 42 },
  { month: "17.10", stock: 34 }, { month: "17.11", stock: 25 }, { month: "17.12", stock: 23 },
  { month: "18.01", stock: 22 }, { month: "18.02", stock: 13 }, { month: "18.03", stock: 13 },
  { month: "18.04", stock: 12 }, { month: "18.05", stock: 18 }, { month: "18.06", stock: 22 },
  { month: "18.07", stock: 21 }, { month: "18.08", stock: 21 }, { month: "18.09", stock: 25 },
  { month: "18.10", stock: 20 }, { month: "18.11", stock: 21 }, { month: "18.12", stock: 15 },
  { month: "19.01", stock: 15 }, { month: "19.02", stock: 17 }, { month: "19.03", stock: 17 },
  { month: "19.04", stock: 29 }, { month: "19.05", stock: 25 }, { month: "19.06", stock: 29 },
  { month: "19.07", stock: 36 }, { month: "19.08", stock: 36 }, { month: "19.09", stock: 31 },
  { month: "19.10", stock: 33 }, { month: "19.11", stock: 32 }, { month: "19.12", stock: 26 },
  { month: "20.01", stock: 32 }, { month: "20.02", stock: 31 }, { month: "20.03", stock: 17 },
  { month: "20.04", stock: 22 }, { month: "20.05", stock: 26 }, { month: "20.06", stock: 27 },
  { month: "20.07", stock: 24 }, { month: "20.08", stock: 24 }, { month: "20.09", stock: 26 },
  { month: "20.10", stock: 26 }, { month: "20.11", stock: 42 }, { month: "20.12", stock: 42 },
  { month: "21.01", stock: 53 }, { month: "21.02", stock: 64 }, { month: "21.03", stock: 57 },
  { month: "21.04", stock: 47 }, { month: "21.05", stock: 52 }, { month: "21.06", stock: 52 },
  { month: "21.07", stock: 46 }, { month: "21.08", stock: 58 }, { month: "21.09", stock: 57 },
  { month: "21.10", stock: 70 }, { month: "21.11", stock: 75 }, { month: "21.12", stock: 89 },
  { month: "22.01", stock: 79 }, { month: "22.02", stock: 69 }, { month: "22.03", stock: 64 },
  { month: "22.04", stock: 49 }, { month: "22.05", stock: 47 }, { month: "22.06", stock: 59 },
  { month: "22.07", stock: 85 }, { month: "22.08", stock: 89 }, { month: "22.09", stock: 80 },
  { month: "22.10", stock: 115 }, { month: "22.11", stock: 128 }, { month: "22.12", stock: 109 },
  { month: "23.01", stock: 130 }, { month: "23.02", stock: 133 }, { month: "23.03", stock: 136 },
  { month: "23.04", stock: 88 }, { month: "23.05", stock: 102 }, { month: "23.06", stock: 90 },
  { month: "23.07", stock: 67 }, { month: "23.08", stock: 67 }, { month: "23.09", stock: 55 },
  { month: "23.10", stock: 65 }, { month: "23.11", stock: 84 }, { month: "23.12", stock: 90 },
  { month: "24.01", stock: 97 }, { month: "24.02", stock: 109 }, { month: "24.03", stock: 128 },
  { month: "24.04", stock: 159 }, { month: "24.05", stock: 164 }, { month: "24.06", stock: 157 },
  { month: "24.07", stock: 159 }, { month: "24.08", stock: 168 }, { month: "24.09", stock: 217 },
  { month: "24.10", stock: 190 }, { month: "24.11", stock: 192 }, { month: "24.12", stock: 145 },
  { month: "25.01", stock: 127 }, { month: "25.02", stock: 97 }, { month: "25.03", stock: 91 },
];

// Merge quarterly chip revenue onto monthly stock for combined chart
const stockRevenueData = stockMonthly.map((s) => {
  // Match quarter-end months to quarterly data
  const m = parseInt(s.month.split(".")[1]);
  const y = s.month.split(".")[0];
  let chipRev: number | null = null;
  if (m === 3 || m === 6 || m === 9 || m === 12) {
    const qNum = Math.ceil(m / 3);
    const qLabel = `${y}.${qNum}Q`;
    const match = quarterlyData.find((q) => q.quarter === qLabel);
    if (match) chipRev = match.chipRev;
  }
  return { ...s, chipRev };
});

interface ChartProps {
  title?: string;
  subtitle?: string;
}

export function PQDecompositionChart({ title, subtitle }: ChartProps) {
  return (
    <div className="my-8">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">
        {title || "Impinj 칩 매출 P/Q 분해 · 주가"}
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        {subtitle || "연간 칩매출 YoY 변동: P(단가) 효과 vs Q(볼륨) 효과"}
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4 overflow-x-auto">
        <div style={{ minWidth: 700 }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={pqData}
              margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "$M (YoY Δ)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { fontSize: 10, fill: "#999" },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "주가 ($)",
                  angle: 90,
                  position: "insideRight",
                  offset: 5,
                  style: { fontSize: 10, fill: "#999" },
                }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value, name) => {
                  if (String(name).includes("주가")) return [`$${value}`, String(name)];
                  return [`$${value}M`, String(name)];
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <ReferenceLine yAxisId="left" y={0} stroke="#e5e7eb" />
              <Bar
                yAxisId="left"
                dataKey="pEffect"
                fill="#f87171"
                name="P 효과 (단가)"
              />
              <Bar
                yAxisId="left"
                dataKey="qEffect"
                fill="#60a5fa"
                name="Q 효과 (볼륨)"
              />
              <Line
                yAxisId="left"
                dataKey="totalChange"
                stroke="#f59e0b"
                name="총 변동 (P+Q)"
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                yAxisId="right"
                dataKey="stock"
                stroke="#ef4444"
                name="PI 주가 (연말, $)"
                strokeWidth={2}
                dot={{ r: 3 }}
                strokeDasharray="5 3"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function StockRevenueChart({ title, subtitle }: ChartProps) {
  return (
    <div className="my-8">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">
        {title || "PI 주가 · 분기별 칩 매출"}
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        {subtitle || "칩 매출 추이와 주가의 동행"}
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4 overflow-x-auto">
        <div style={{ minWidth: 700 }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={stockRevenueData}
              margin={{ top: 10, right: 50, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#999" }}
                tickLine={false}
                interval={2}
                angle={-45}
                textAnchor="end"
                height={55}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 230]}
                label={{
                  value: "주가 ($)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: { fontSize: 10, fill: "#999" },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "칩 매출 ($M)",
                  angle: 90,
                  position: "insideRight",
                  offset: 5,
                  style: { fontSize: 10, fill: "#999" },
                }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value, name) => {
                  if (value === null) return ["-", String(name)];
                  if (String(name).includes("매출")) return [`$${value}M`, String(name)];
                  return [`$${value}`, String(name)];
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Line
                yAxisId="left"
                dataKey="stock"
                stroke="#ef4444"
                name="PI 주가 ($)"
                strokeWidth={2.5}
                dot={false}
              />
              <Bar
                yAxisId="right"
                dataKey="chipRev"
                fill="#60a5fa"
                name="칩 매출 ($M)"
                radius={[2, 2, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
