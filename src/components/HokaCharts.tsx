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

import weeklyRaw from "@/data/stock-trend-weekly.json";

interface WeeklyRow {
  week: string;
  gt: number;
  stock: number | null;
  nq: number | null;
  ry: number | null;
}

const stockTrendData = (weeklyRaw as WeeklyRow[]).map((r) => ({
  week: r.week,
  googleTrend: r.gt,
  stock: r.stock,
  nasdaq: r.nq,
  revenueYoy: r.ry,
}));

// HOKA quarterly revenue (Deckers 10-K/10-Q + Fiscal.ai, $M)
// Wholesale from Fiscal.ai; D2C = Total - Wholesale
const revenueData = [
  { quarter: "20.2Q", wholesale: 76, d2c: 33, wholesaleYoy: null, d2cYoy: null },
  { quarter: "20.3Q", wholesale: 100, d2c: 43, wholesaleYoy: null, d2cYoy: null },
  { quarter: "20.4Q", wholesale: 92, d2c: 50, wholesaleYoy: null, d2cYoy: null },
  { quarter: "21.1Q", wholesale: 120, d2c: 58, wholesaleYoy: null, d2cYoy: null },
  { quarter: "21.2Q", wholesale: 145, d2c: 68, wholesaleYoy: 91, d2cYoy: 106 },
  { quarter: "21.3Q", wholesale: 138, d2c: 72, wholesaleYoy: 38, d2cYoy: 67 },
  { quarter: "21.4Q", wholesale: 123, d2c: 62, wholesaleYoy: 34, d2cYoy: 24 },
  { quarter: "22.1Q", wholesale: 208, d2c: 75, wholesaleYoy: 73, d2cYoy: 29 },
  { quarter: "22.2Q", wholesale: 232, d2c: 98, wholesaleYoy: 60, d2cYoy: 44 },
  { quarter: "22.3Q", wholesale: 223, d2c: 110, wholesaleYoy: 62, d2cYoy: 53 },
  { quarter: "22.4Q", wholesale: 224, d2c: 128, wholesaleYoy: 82, d2cYoy: 106 },
  { quarter: "23.1Q", wholesale: 247, d2c: 151, wholesaleYoy: 19, d2cYoy: 101 },
  { quarter: "23.2Q", wholesale: 261, d2c: 159, wholesaleYoy: 13, d2cYoy: 62 },
  { quarter: "23.3Q", wholesale: 263, d2c: 161, wholesaleYoy: 18, d2cYoy: 46 },
  { quarter: "23.4Q", wholesale: 252, d2c: 177, wholesaleYoy: 13, d2cYoy: 38 },
  { quarter: "24.1Q", wholesale: 350, d2c: 183, wholesaleYoy: 42, d2cYoy: 21 },
  { quarter: "24.2Q", wholesale: 333, d2c: 212, wholesaleYoy: 28, d2cYoy: 33 },
  { quarter: "24.3Q", wholesale: 362, d2c: 209, wholesaleYoy: 38, d2cYoy: 30 },
  { quarter: "24.4Q", wholesale: 305, d2c: 226, wholesaleYoy: 21, d2cYoy: 28 },
  { quarter: "25.1Q", wholesale: 397, d2c: 189, wholesaleYoy: 13, d2cYoy: 3 },
];

// stockTrendData imported from JSON (274 weekly data points)

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
              fill="#93c5fd"
              name="Wholesale"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="d2c"
              fill="#fdba74"
              name="D2C"
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="right"
              dataKey="wholesaleYoy"
              stroke="#1e40af"
              name="Wholesale YoY"
              strokeWidth={2}
              dot={{ r: 2.5 }}
              connectNulls
            />
            <Line
              yAxisId="right"
              dataKey="d2cYoy"
              stroke="#ea580c"
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
              dataKey="week"
              tick={{ fontSize: 9, fill: "#999" }}
              tickLine={false}
              interval={12}
              angle={-45}
              textAnchor="end"
              height={55}
              tickFormatter={(v: string) => v.slice(2, 7)}
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
                if (String(name).includes("NASDAQ"))
                  return [`${Number(value) * 100}`, String(name)];
                return [String(value), String(name)];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            {/* NASDAQ as faded gray background line */}
            <Line
              yAxisId="left"
              dataKey="nasdaq"
              stroke="#d4d4d4"
              name="NASDAQ (÷100)"
              strokeWidth={2}
              dot={false}
              strokeOpacity={0.6}
            />
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
              x="2023-07-16"
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
              x="2024-12-22"
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
