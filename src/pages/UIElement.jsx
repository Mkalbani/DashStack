import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const IUElelement = () => {
  const [filterBy, setFilterBy] = useState("Charts");
  const [showFilter, setShowFilter] = useState(false);

  const barData1 = [
    { name: "A", value: 20, value2: 11, value3:11 },
    { name: "B", value: 30, value2: 13, value3:11 },
    { name: "C", value: 15, value2: 22, value3:11 },
    { name: "D", value: 25, value2: 11, value3:11 },
    { name: "E", value: 22, value2: 8,  value3:11},
    { name: "F", value: 18, value2: 12, value3:11 },
  ];

  const barData2 = [
    { name: "A", value1: 20, value2: 30 },
    { name: "B", value1: 30, value2: 20 },
    { name: "C", value1: 15, value2: 25 },
    { name: "D", value1: 25, value2: 15 },
    { name: "E", value1: 22, value2: 28 },
    { name: "F", value1: 18, value2: 22 },
  ];

  const pieDatas = [
    [
      { name: "A", value: 10 },
      { name: "B", value: 30 },
    ],
    [
      { name: "A", value: 30 },
      { name: "B", value: 10 },
    ],
    [
      { name: "A", value: 10 },
      { name: "B", value: 15 },
    ],
    [
      { name: "A", value: 30 },
      { name: "B", value: 15 },
    ],
  ];

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  const renderBarCharts = () => {
    const charts = [
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData1} barSize={7}>
          <Bar dataKey="value" fill="#3b82f6" radius={4} />
        </BarChart>
      </ResponsiveContainer>,
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData1} barSize={7}>
          <Bar dataKey="value" fill="white" stackId="a" />
          <Bar dataKey="value2" fill="#00C49F" stackId="a" />
          <Bar
            dataKey="value3"
            fill="#D0F1FA"
            stackId="a"
            radius={[4, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>,
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData2} barSize={7}>
          <Bar dataKey="value1" fill="#4049FF" radius={4} />
          <Bar dataKey="value2" fill="#FF9000" radius={4} />
        </BarChart>
      </ResponsiveContainer>,
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData1} barSize={7}>
          <Bar dataKey="value" fill="#FF5DA0" stackId="a" />
          <Bar dataKey="value2" fill="#FF84B7" stackId="a" />
          <Bar
            dataKey="value3"
            fill="white"
            stackId="a"
            radius={[4, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>,
    ];

    return charts.map((chart, index) => (
      <div key={index} className="w-1/4 h-32">
        {chart}
      </div>
    ));
  };

  const renderPieCharts = () => {
    const colorSets = [
      ["#4049FF", "white"],
      ["white", "#B140FF"],
      ["#FF8743", "white"],
      ["white", "#4393FF"],
    ];

    return pieDatas.map((data, index) => (
      <div key={index} className="w-1/4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data} 
              cy="50%"
              innerRadius={0}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              startAngle={180}
              endAngle={-180}
            >
              {data.map((entry, dataIndex) => (
                <Cell
                  key={`cell-${dataIndex}`}
                  fill={colorSets[index][dataIndex % colorSets[index].length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    ));
  };


  const renderDonutCharts = () => {
    return COLORS.slice(0, 4).map((color, index) => (
      <div key={index} className="w-1/4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[{ value: 15 }, { value:80 }]}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              <Cell fill={color} />
              <Cell fill={`${color}40`} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    ));
  };

  const filterOptions = [
    "Charts",
    "Demographics",
    "Locations",
    "Sessions",
    "Users",
  ];

  return (
    <div className="bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-bold">UI Elements</h2>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 p-2 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400 ml-2">Filter by</span>
          </div>
          <div className="relative">
            <button
              className="bg-gray-800 p-2 rounded-md flex items-center"
              onClick={() => setShowFilter(!showFilter)}
            >
              <span className="text-gray-400">{filterBy}</span>
              <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      setFilterBy(option);
                      setShowFilter(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white text-lg mb-4">Bar Chart</h3>
          <div className="flex space-x-4 h-32">{renderBarCharts()}</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white text-lg mb-4">Pie Chart</h3>
          <div className="flex space-x-4 h-32">{renderPieCharts()}</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white text-lg mb-4">Donut Chart</h3>
          <div className="flex space-x-4 h-32">{renderDonutCharts()}</div>
        </div>
      </div>
    </div>
  );
};

export default IUElelement;
