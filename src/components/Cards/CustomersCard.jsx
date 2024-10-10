import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "New Customers", value: 34249 },
  { name: "Repeated Customers", value: 1420 },
];

const COLORS = ["#6494FF", "#D8D8D8"]; // New: Blue, Repeated: Light Blue

const CustomersCard = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-white">
      <h3 className="text-lg font-semibold">Customers</h3>
      <div className="flex justify-center items-center my-5 w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-center">
        <div>
          <span className="block text-blue-500 text-xl">
            {data[0].value.toLocaleString()}
          </span>
          <span className="text-sm">New Customers</span>
        </div>
        <div>
          <span className="block text-blue-300 text-xl">
            {data[1].value.toLocaleString()}
          </span>
          <span className="text-sm">Repeated</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersCard;