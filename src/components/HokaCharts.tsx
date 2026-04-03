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

// HOKA quarterly revenue (Deckers 10-K/10-Q, $M)
// Total & Wholesale from Fiscal.ai; D2C = Total - Wholesale
// Deckers FY ends March 31. Calendar quarter labels used.
const revenueData = [
  // Pre-split data (wholesale/D2C not available from chart)
  { quarter: "20.2Q", wholesale: null, d2c: null, total: 109, wholesaleYoy: null, d2cYoy: null, totalYoy: null },
  { quarter: "20.3Q", wholesale: null, d2c: null, total: 143, wholesaleYoy: null, d2cYoy: null, totalYoy: null },
  { quarter: "20.4Q", wholesale: null, d2c: null, total: 142, wholesaleYoy: null, d2cYoy: null, totalYoy: null },
  { quarter: "21.1Q", wholesale: null, d2c: null, total: 178, wholesaleYoy: null, d2cYoy: null, totalYoy: null },
  { quarter: "21.2Q", wholesale: null, d2c: null, total: 213, wholesaleYoy: null, d2cYoy: null, totalYoy: 95 },
  { quarter: "21.3Q", wholesale: null, d2c: null, total: 210, wholesaleYoy: null, d2cYoy: null, totalYoy: 47 },
  // Split data available (from Fiscal.ai chart)
  { quarter: "21.4Q", wholesale: 123, d2c: 62, total: null, wholesaleYoy: null, d2cYoy: null, totalYoy: 30 },
  { quarter: "22.1Q", wholesale: 208, d2c: 75, total: null, wholesaleYoy: null, d2cYoy: null, totalYoy: 59 },
  { quarter: "22.2Q", wholesale: 232, d2c: 98, total: null, wholesaleYoy: null, d2cYoy: null, totalYoy: 55 },
  { quarter: "22.3Q", wholesale: 223, d2c: 110, total: null, wholesaleYoy: null, d2cYoy: null, totalYoy: 59 },
  { quarter: "22.4Q", wholesale: 224, d2c: 128, total: null, wholesaleYoy: 82, d2cYoy: 106, totalYoy: 90 },
  { quarter: "23.1Q", wholesale: 247, d2c: 151, total: null, wholesaleYoy: 19, d2cYoy: 101, totalYoy: 41 },
  { quarter: "23.2Q", wholesale: 261, d2c: 159, total: null, wholesaleYoy: 13, d2cYoy: 62, totalYoy: 27 },
  { quarter: "23.3Q", wholesale: 263, d2c: 161, total: null, wholesaleYoy: 18, d2cYoy: 46, totalYoy: 27 },
  { quarter: "23.4Q", wholesale: 252, d2c: 177, total: null, wholesaleYoy: 13, d2cYoy: 38, totalYoy: 22 },
  { quarter: "24.1Q", wholesale: 350, d2c: 183, total: null, wholesaleYoy: 42, d2cYoy: 21, totalYoy: 34 },
  { quarter: "24.2Q", wholesale: 333, d2c: 212, total: null, wholesaleYoy: 28, d2cYoy: 33, totalYoy: 30 },
  { quarter: "24.3Q", wholesale: 362, d2c: 209, total: null, wholesaleYoy: 38, d2cYoy: 30, totalYoy: 35 },
  { quarter: "24.4Q", wholesale: 305, d2c: 226, total: null, wholesaleYoy: 21, d2cYoy: 28, totalYoy: 24 },
  { quarter: "25.1Q", wholesale: 397, d2c: 189, total: null, wholesaleYoy: 13, d2cYoy: 3, totalYoy: 10 },
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
        HOKA Wholesale · D2C Revenue ($M)
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        Deckers Outdoor 분기별 HOKA 브랜드 매출 (Wholesale / D2C 채널별)
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
              domain={[0, 120]}
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
                if (value === null || value === undefined) return ["-", String(name)];
                if (String(name).includes("YoY"))
                  return [`${value}%`, String(name)];
                return [`$${value}M`, String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Bar
              yAxisId="left"
              dataKey="wholesale"
              fill="#f97316"
              name="Wholesale"
              stackId="revenue"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="d2c"
              fill="#6fb8af"
              name="D2C"
              stackId="revenue"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="total"
              fill="#94a3b8"
              name="Total (split N/A)"
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="right"
              dataKey="totalYoy"
              stroke="#ef4444"
              name="Total YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
            />
            <Line
              yAxisId="right"
              dataKey="wholesaleYoy"
              stroke="#ea580c"
              name="Wholesale YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
              strokeDasharray="5 3"
            />
            <Line
              yAxisId="right"
              dataKey="d2cYoy"
              stroke="#14b8a6"
              name="D2C YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
              strokeDasharray="5 3"
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
