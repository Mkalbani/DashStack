import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import MonthBtn from "../../ui/MonthBtn";

const data = [
  { name: "5k", Sales: 20, Profit: 25 },
  { name: "10k", Sales: 70, Profit: 30 },
  { name: "15k", Sales: 35, Profit: 25 },
  { name: "20k", Sales: 30, Profit: 30 },
  { name: "25k", Sales: 50, Profit: 40 },
  { name: "30k", Sales: 40, Profit: 90 },
  { name: "35k", Sales: 60, Profit: 70 },
  { name: "40k", Sales: 40, Profit: 50 },
  { name: "45k", Sales: 70, Profit: 60 },
  { name: "50k", Sales: 35, Profit: 60 },
  { name: "55k", Sales: 40, Profit: 40 },
  { name: "60k", Sales: 90, Profit: 60 },
];

const RevenueChart = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Revenue</h2>
        <MonthBtn />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Legend verticalAlign="bottom" height={36} />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Area
            type="monotone"
            dataKey="Sales"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorSales)"
          />
          <Area
            type="monotone"
            dataKey="Profit"
            stroke="#f87171"
            fillOpacity={1}
            fill="url(#colorProfit)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <Legend />
    </div>
  );
};

export default RevenueChart;

const Legend = () => (
  <div className="flex justify-center items-center mt-4 space-x-6">
    <div className="flex items-center">
      <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
      <span className="text-sm text-gray-300">Sales</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
      <span className="text-sm text-gray-300">Profit</span>
    </div>
  </div>
);
