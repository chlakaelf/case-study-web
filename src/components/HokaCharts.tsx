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
  Area,
} from "recharts";

// HOKA quarterly total revenue (Deckers 10-K/10-Q, $M)
// Deckers FY ends March 31. Calendar quarter labels used.
const revenueData = [
  { quarter: "20.2Q", revenue: 109.0, yoy: null },
  { quarter: "20.3Q", revenue: 143.1, yoy: null },
  { quarter: "20.4Q", revenue: 141.6, yoy: null },
  { quarter: "21.1Q", revenue: 177.5, yoy: null },
  { quarter: "21.2Q", revenue: 213.1, yoy: 95.5 },
  { quarter: "21.3Q", revenue: 210.4, yoy: 47.0 },
  { quarter: "21.4Q", revenue: 184.6, yoy: 30.4 },
  { quarter: "22.1Q", revenue: 283.5, yoy: 59.7 },
  { quarter: "22.2Q", revenue: 330.0, yoy: 54.9 },
  { quarter: "22.3Q", revenue: 333.0, yoy: 58.3 },
  { quarter: "22.4Q", revenue: 352.1, yoy: 90.7 },
  { quarter: "23.1Q", revenue: 397.7, yoy: 40.3 },
  { quarter: "23.2Q", revenue: 420.5, yoy: 27.4 },
  { quarter: "23.3Q", revenue: 424.0, yoy: 27.3 },
  { quarter: "23.4Q", revenue: 429.3, yoy: 21.9 },
  { quarter: "24.1Q", revenue: 533.0, yoy: 34.0 },
  { quarter: "24.2Q", revenue: 545.2, yoy: 29.7 },
  { quarter: "24.3Q", revenue: 570.9, yoy: 34.6 },
  { quarter: "24.4Q", revenue: 530.9, yoy: 23.7 },
  { quarter: "25.1Q", revenue: 586.1, yoy: 10.0 },
];

// DECK monthly stock price (post-split adjusted) + Google Trends ("Hoka", US, monthly)
// Revenue YoY only at quarter-end months (quarterly data)
const stockTrendData = [
  // 2020
  { month: "20.01", stock: 29, googleTrend: 17, revenueYoy: null },
  { month: "20.02", stock: 32, googleTrend: 19, revenueYoy: null },
  { month: "20.03", stock: 23, googleTrend: 16, revenueYoy: null },
  { month: "20.04", stock: 23, googleTrend: 17, revenueYoy: null },
  { month: "20.05", stock: 27, googleTrend: 22, revenueYoy: null },
  { month: "20.06", stock: 33, googleTrend: 23, revenueYoy: null },
  { month: "20.07", stock: 34, googleTrend: 22, revenueYoy: null },
  { month: "20.08", stock: 35, googleTrend: 22, revenueYoy: null },
  { month: "20.09", stock: 35, googleTrend: 20, revenueYoy: null },
  { month: "20.10", stock: 42, googleTrend: 19, revenueYoy: null },
  { month: "20.11", stock: 43, googleTrend: 21, revenueYoy: null },
  { month: "20.12", stock: 48, googleTrend: 20, revenueYoy: null },
  // 2021
  { month: "21.01", stock: 52, googleTrend: 23, revenueYoy: null },
  { month: "21.02", stock: 53, googleTrend: 22, revenueYoy: null },
  { month: "21.03", stock: 54, googleTrend: 31, revenueYoy: null },
  { month: "21.04", stock: 57, googleTrend: 32, revenueYoy: null },
  { month: "21.05", stock: 56, googleTrend: 32, revenueYoy: null },
  { month: "21.06", stock: 57, googleTrend: 34, revenueYoy: 96 },
  { month: "21.07", stock: 65, googleTrend: 37, revenueYoy: null },
  { month: "21.08", stock: 72, googleTrend: 36, revenueYoy: null },
  { month: "21.09", stock: 67, googleTrend: 36, revenueYoy: 47 },
  { month: "21.10", stock: 61, googleTrend: 34, revenueYoy: null },
  { month: "21.11", stock: 70, googleTrend: 43, revenueYoy: null },
  { month: "21.12", stock: 62, googleTrend: 38, revenueYoy: 30 },
  // 2022
  { month: "22.01", stock: 55, googleTrend: 39, revenueYoy: null },
  { month: "22.02", stock: 51, googleTrend: 44, revenueYoy: null },
  { month: "22.03", stock: 45, googleTrend: 54, revenueYoy: 60 },
  { month: "22.04", stock: 46, googleTrend: 52, revenueYoy: null },
  { month: "22.05", stock: 42, googleTrend: 56, revenueYoy: null },
  { month: "22.06", stock: 44, googleTrend: 62, revenueYoy: 55 },
  { month: "22.07", stock: 46, googleTrend: 67, revenueYoy: null },
  { month: "22.08", stock: 54, googleTrend: 71, revenueYoy: null },
  { month: "22.09", stock: 56, googleTrend: 57, revenueYoy: 58 },
  { month: "22.10", stock: 58, googleTrend: 54, revenueYoy: null },
  { month: "22.11", stock: 60, googleTrend: 65, revenueYoy: null },
  { month: "22.12", stock: 64, googleTrend: 61, revenueYoy: 91 },
  // 2023
  { month: "23.01", stock: 69, googleTrend: 66, revenueYoy: null },
  { month: "23.02", stock: 69, googleTrend: 75, revenueYoy: null },
  { month: "23.03", stock: 72, googleTrend: 80, revenueYoy: 40 },
  { month: "23.04", stock: 78, googleTrend: 89, revenueYoy: null },
  { month: "23.05", stock: 79, googleTrend: 91, revenueYoy: null },
  { month: "23.06", stock: 83, googleTrend: 95, revenueYoy: 27 },
  { month: "23.07", stock: 90, googleTrend: 99, revenueYoy: null },
  { month: "23.08", stock: 91, googleTrend: 94, revenueYoy: null },
  { month: "23.09", stock: 87, googleTrend: 79, revenueYoy: 27 },
  { month: "23.10", stock: 86, googleTrend: 70, revenueYoy: null },
  { month: "23.11", stock: 105, googleTrend: 97, revenueYoy: null },
  { month: "23.12", stock: 116, googleTrend: 87, revenueYoy: 22 },
  // 2024
  { month: "24.01", stock: 120, googleTrend: 74, revenueYoy: null },
  { month: "24.02", stock: 143, googleTrend: 85, revenueYoy: null },
  { month: "24.03", stock: 154, googleTrend: 96, revenueYoy: 34 },
  { month: "24.04", stock: 140, googleTrend: 89, revenueYoy: null },
  { month: "24.05", stock: 151, googleTrend: 100, revenueYoy: null },
  { month: "24.06", stock: 169, googleTrend: 97, revenueYoy: 30 },
  { month: "24.07", stock: 151, googleTrend: 95, revenueYoy: null },
  { month: "24.08", stock: 154, googleTrend: 96, revenueYoy: null },
  { month: "24.09", stock: 155, googleTrend: 80, revenueYoy: 35 },
  { month: "24.10", stock: 161, googleTrend: 71, revenueYoy: null },
  { month: "24.11", stock: 178, googleTrend: 97, revenueYoy: null },
  { month: "24.12", stock: 204, googleTrend: 88, revenueYoy: 24 },
  // 2025
  { month: "25.01", stock: 210, googleTrend: 73, revenueYoy: null },
  { month: "25.02", stock: 155, googleTrend: 70, revenueYoy: null },
  { month: "25.03", stock: 122, googleTrend: 86, revenueYoy: 10 },
];

export function HokaRevenueChart() {
  return (
    <div className="my-8">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">
        HOKA Quarterly Revenue ($M)
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        Deckers Outdoor 분기별 HOKA 브랜드 총 매출 및 YoY 성장률
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={revenueData}
            margin={{ top: 10, right: 50, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="quarter"
              tick={{ fontSize: 10, fill: "#999" }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={55}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#999" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "$M",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { fontSize: 11, fill: "#999" },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#999" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
              label={{
                value: "YoY %",
                angle: 90,
                position: "insideRight",
                offset: 5,
                style: { fontSize: 11, fill: "#999" },
              }}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
              formatter={(value, name) => {
                if (String(name).includes("YoY"))
                  return [`${value}%`, String(name)];
                return [`$${value}M`, String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#1e3a5f"
              name="HOKA Revenue"
              radius={[3, 3, 0, 0]}
            />
            <Line
              yAxisId="right"
              dataKey="yoy"
              stroke="#f97316"
              name="Revenue YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function StockTrendChart() {
  return (
    <div className="my-8">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">
        DECK 주가 · 구글트렌드 · HOKA 매출 YoY
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        구글트렌드 YoY 성장 둔화(23.2Q~) → 주가 고점(24.12): 약 5분기 시차
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4">
        <ResponsiveContainer width="100%" height={420}>
          <ComposedChart
            data={stockTrendData}
            margin={{ top: 20, right: 50, left: 10, bottom: 30 }}
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
              domain={[0, 220]}
              label={{
                value: "주가($) / 트렌드",
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
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
              label={{
                value: "YoY %",
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
                if (String(name).includes("YoY"))
                  return [`${value}%`, String(name)];
                if (String(name).includes("주가"))
                  return [`$${value}`, String(name)];
                return [String(value), String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area
              yAxisId="left"
              dataKey="googleTrend"
              fill="#dbeafe"
              stroke="#3b82f6"
              name="구글트렌드 (HOKA)"
              strokeWidth={2}
              fillOpacity={0.3}
            />
            <Line
              yAxisId="left"
              dataKey="stock"
              stroke="#ef4444"
              name="DECK 주가 ($)"
              strokeWidth={2.5}
              dot={false}
            />
            <Line
              yAxisId="right"
              dataKey="revenueYoy"
              stroke="#f97316"
              name="매출 YoY (%)"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
              strokeDasharray="5 3"
            />
            <ReferenceLine
              yAxisId="left"
              x="23.07"
              stroke="#3b82f6"
              strokeDasharray="3 3"
              label={{
                value: "트렌드 고점",
                position: "top",
                fill: "#3b82f6",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              yAxisId="left"
              x="24.12"
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{
                value: "주가 고점",
                position: "top",
                fill: "#ef4444",
                fontSize: 10,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
