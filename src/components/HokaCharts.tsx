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

// HOKA quarterly revenue data (Deckers fiscal year ends March 31)
// Calendar quarter labels used for readability
const revenueData = [
  // FY2021 (Apr 2020 - Mar 2021)
  { quarter: "20.2Q", wholesale: 76, d2c: 33, wholesaleYoy: null, d2cYoy: null },
  { quarter: "20.3Q", wholesale: 100, d2c: 43, wholesaleYoy: null, d2cYoy: null },
  { quarter: "20.4Q", wholesale: 92, d2c: 50, wholesaleYoy: null, d2cYoy: null },
  { quarter: "21.1Q", wholesale: 120, d2c: 58, wholesaleYoy: null, d2cYoy: null },
  // FY2022 (Apr 2021 - Mar 2022)
  { quarter: "21.2Q", wholesale: 145, d2c: 68, wholesaleYoy: 91, d2cYoy: 106 },
  { quarter: "21.3Q", wholesale: 138, d2c: 72, wholesaleYoy: 38, d2cYoy: 67 },
  { quarter: "21.4Q", wholesale: 114, d2c: 71, wholesaleYoy: 24, d2cYoy: 42 },
  { quarter: "22.1Q", wholesale: 185, d2c: 99, wholesaleYoy: 54, d2cYoy: 71 },
  // FY2023 (Apr 2022 - Mar 2023)
  { quarter: "22.2Q", wholesale: 215, d2c: 115, wholesaleYoy: 48, d2cYoy: 69 },
  { quarter: "22.3Q", wholesale: 207, d2c: 126, wholesaleYoy: 50, d2cYoy: 75 },
  { quarter: "22.4Q", wholesale: 207, d2c: 145, wholesaleYoy: 82, d2cYoy: 104 },
  { quarter: "23.1Q", wholesale: 237, d2c: 161, wholesaleYoy: 28, d2cYoy: 63 },
  // FY2024 (Apr 2023 - Mar 2024)
  { quarter: "23.2Q", wholesale: 258, d2c: 163, wholesaleYoy: 20, d2cYoy: 42 },
  { quarter: "23.3Q", wholesale: 258, d2c: 166, wholesaleYoy: 25, d2cYoy: 32 },
  { quarter: "23.4Q", wholesale: 253, d2c: 176, wholesaleYoy: 22, d2cYoy: 21 },
  { quarter: "24.1Q", wholesale: 326, d2c: 207, wholesaleYoy: 38, d2cYoy: 29 },
  // FY2025 (Apr 2024 - Mar 2025)
  { quarter: "24.2Q", wholesale: 339, d2c: 206, wholesaleYoy: 31, d2cYoy: 26 },
  { quarter: "24.3Q", wholesale: 353, d2c: 218, wholesaleYoy: 37, d2cYoy: 31 },
  { quarter: "24.4Q", wholesale: 325, d2c: 206, wholesaleYoy: 28, d2cYoy: 17 },
  { quarter: "25.1Q", wholesale: 370, d2c: 216, wholesaleYoy: 13, d2cYoy: 4 },
];

// DECK stock price + Google Trends + HOKA revenue YoY
const stockTrendData = [
  { quarter: "20.1Q", stock: 22, googleTrend: 18, revenueYoy: null },
  { quarter: "20.2Q", stock: 33, googleTrend: 22, revenueYoy: null },
  { quarter: "20.3Q", stock: 37, googleTrend: 28, revenueYoy: null },
  { quarter: "20.4Q", stock: 48, googleTrend: 32, revenueYoy: null },
  { quarter: "21.1Q", stock: 55, googleTrend: 38, revenueYoy: 62 },
  { quarter: "21.2Q", stock: 64, googleTrend: 45, revenueYoy: 96 },
  { quarter: "21.3Q", stock: 60, googleTrend: 52, revenueYoy: 47 },
  { quarter: "21.4Q", stock: 61, googleTrend: 55, revenueYoy: 30 },
  { quarter: "22.1Q", stock: 46, googleTrend: 60, revenueYoy: 56 },
  { quarter: "22.2Q", stock: 43, googleTrend: 68, revenueYoy: 55 },
  { quarter: "22.3Q", stock: 52, googleTrend: 78, revenueYoy: 59 },
  { quarter: "22.4Q", stock: 67, googleTrend: 88, revenueYoy: 91 },
  { quarter: "23.1Q", stock: 75, googleTrend: 92, revenueYoy: 40 },
  { quarter: "23.2Q", stock: 88, googleTrend: 95, revenueYoy: 28 },
  { quarter: "23.3Q", stock: 86, googleTrend: 100, revenueYoy: 28 },
  { quarter: "23.4Q", stock: 111, googleTrend: 97, revenueYoy: 22 },
  { quarter: "24.1Q", stock: 157, googleTrend: 90, revenueYoy: 34 },
  { quarter: "24.2Q", stock: 161, googleTrend: 88, revenueYoy: 30 },
  { quarter: "24.3Q", stock: 159, googleTrend: 85, revenueYoy: 35 },
  { quarter: "24.4Q", stock: 203, googleTrend: 82, revenueYoy: 24 },
  { quarter: "25.1Q", stock: 112, googleTrend: 78, revenueYoy: 10 },
];

export function HokaRevenueChart() {
  return (
    <div className="my-8">
      <h3 className="text-base font-semibold text-zinc-800 mb-1">
        HOKA Wholesale · D2C Revenue ($m)
      </h3>
      <p className="text-xs text-zinc-400 mb-4">
        Deckers Outdoor 분기별 HOKA 브랜드 매출 추정 (Wholesale / D2C 채널별)
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="quarter"
              tick={{ fontSize: 10, fill: "#999" }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#999" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "$m",
                angle: -90,
                position: "insideLeft",
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
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
              formatter={(value, name) => {
                if (String(name).includes("yoy") || String(name).includes("YoY"))
                  return [`${value}%`, String(name)];
                return [`$${value}m`, String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar
              yAxisId="left"
              dataKey="wholesale"
              fill="#1e3a5f"
              name="Wholesale"
              stackId="revenue"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="d2c"
              fill="#60a5fa"
              name="D2C"
              stackId="revenue"
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="right"
              dataKey="wholesaleYoy"
              stroke="#f97316"
              name="Wholesale YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
            />
            <Line
              yAxisId="right"
              dataKey="d2cYoy"
              stroke="#22c55e"
              name="D2C YoY"
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
        구글트렌드 고점(23.3Q) → 주가 고점(24.4Q): 약 5분기 시차
      </p>
      <div className="bg-white rounded-xl border border-zinc-200 p-4">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart
            data={stockTrendData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="quarter"
              tick={{ fontSize: 10, fill: "#999" }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#999" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 220]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#999" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
              formatter={(value, name) => {
                if (String(name).includes("YoY")) return [`${value}%`, String(name)];
                if (String(name).includes("주가")) return [`$${value}`, String(name)];
                return [String(value), String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
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
              x="23.3Q"
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
