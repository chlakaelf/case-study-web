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

// DECK stock price (post-split adjusted) + Google Trends ("Hoka", US) + HOKA revenue YoY
const stockTrendData = [
  { quarter: "20.1Q", stock: 28, googleTrend: 17, revenueYoy: null },
  { quarter: "20.2Q", stock: 28, googleTrend: 21, revenueYoy: null },
  { quarter: "20.3Q", stock: 35, googleTrend: 21, revenueYoy: null },
  { quarter: "20.4Q", stock: 44, googleTrend: 20, revenueYoy: null },
  { quarter: "21.1Q", stock: 53, googleTrend: 25, revenueYoy: null },
  { quarter: "21.2Q", stock: 56, googleTrend: 33, revenueYoy: 96 },
  { quarter: "21.3Q", stock: 68, googleTrend: 36, revenueYoy: 47 },
  { quarter: "21.4Q", stock: 65, googleTrend: 38, revenueYoy: 30 },
  { quarter: "22.1Q", stock: 50, googleTrend: 46, revenueYoy: 60 },
  { quarter: "22.2Q", stock: 44, googleTrend: 57, revenueYoy: 55 },
  { quarter: "22.3Q", stock: 52, googleTrend: 65, revenueYoy: 58 },
  { quarter: "22.4Q", stock: 61, googleTrend: 60, revenueYoy: 91 },
  { quarter: "23.1Q", stock: 70, googleTrend: 74, revenueYoy: 40 },
  { quarter: "23.2Q", stock: 80, googleTrend: 92, revenueYoy: 27 },
  { quarter: "23.3Q", stock: 89, googleTrend: 91, revenueYoy: 27 },
  { quarter: "23.4Q", stock: 102, googleTrend: 85, revenueYoy: 22 },
  { quarter: "24.1Q", stock: 139, googleTrend: 85, revenueYoy: 34 },
  { quarter: "24.2Q", stock: 153, googleTrend: 95, revenueYoy: 30 },
  { quarter: "24.3Q", stock: 154, googleTrend: 90, revenueYoy: 35 },
  { quarter: "24.4Q", stock: 181, googleTrend: 85, revenueYoy: 24 },
  { quarter: "25.1Q", stock: 162, googleTrend: 76, revenueYoy: 10 },
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
        구글트렌드 YoY 성장 둔화(23.2Q~) → 주가 고점(24.4Q): 약 5분기 시차
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={stockTrendData}
            margin={{ top: 20, right: 50, left: 10, bottom: 30 }}
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
              domain={[0, 200]}
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
              x="23.2Q"
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
              x="24.4Q"
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
