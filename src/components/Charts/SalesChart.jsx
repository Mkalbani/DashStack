import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import MonthBtn from "../../ui/MonthBtn";

const data = [
  { value: 5, sales: 20 },
  { value: 10, sales: 30 },
  { value: 15, sales: 48 },
  { value: 20, sales: 35 },
  { value: 25, sales: 85 },
  { value: 30, sales: 50 },
  { value: 35, sales: 55 },
  { value: 40, sales: 25 },
  { value: 45, sales: 45 },
  { value: 50, sales: 72 },
  { value: 55, sales: 58 },
  { value: 60, sales: 55 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 rounded shadow text-white">
        <p className="text-blue-400 font-bold">{`$${payload[0].value.toFixed(
          2
        )}`}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Sales Details</h2>
        <MonthBtn />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey="value"
            tick={{ fill: "#9CA3AF" }}
            axisLine={{ stroke: "#4B5563" }}
            tickFormatter={(value) => `${value}k`}
          />
          <YAxis
            tick={{ fill: "#9CA3AF" }}
            axisLine={{ stroke: "#4B5563" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="sales"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorSales)"
          />
          <Line
            type="linear"
            dataKey="sales"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
