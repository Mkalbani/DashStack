import React from "react";
import {
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import DealsDetails from "./DealsDetails";
import RevenueChart from "./Charts/RevenueChart";
import Cards from "./Cards";
import SalesChart from "./Charts/SalesChart";
import { HiCube } from "react-icons/hi2";
import { BiLineChart, BiTrendingUp, BiTrendingDown } from "react-icons/bi";


const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Dashboard cards */}
        <DashboardCard
          title="Total User"
          value="40,689"
          change="8.5% "
          icon={UsersIcon}
          iconBg="bg-[#8280FF]"
          text="Up from yesterday"
        />
        <DashboardCard
          title="Total Order"
          value="10293"
          change="1.3%"
          icon={HiCube}
          iconBg="bg-yellow-500"
          text=" Up from past week"
        />
        <DashboardCard
          title="Total Sales"
          value="$89,000"
          change="4.3%"
          icon={BiLineChart}
          iconBg="bg-[#4AD991]"
          changeType="negative"
          text=" Down from yesterday"
        />
        <DashboardCard
          title="Total Pending"
          value="2040"
          change="1.8%"
          icon={ClockIcon}
          iconBg="bg-orange-500"
          text="Up from yesterday"
        />
      </div>

      <SalesChart />
      <DealsDetails />
      <RevenueChart />
      <Cards />
    </div>
  );
};

export default Dashboard;

// Card

function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  iconBg,
  changeType = "positive",
  text,
  iconTrend
}) {
    const TrendIcon = changeType === "positive" ? BiTrendingUp : BiTrendingDown;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-5">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-sm text-start font-medium text-gray-400">
            {title}
          </h2>
          <p className="mt-1 text-start text-2xl font-semibold text-white ">
            {value}
          </p>
        </div>
        <div className={`${iconBg} w-11 h-11 rounded-2xl p-3`}>
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </div>
      <div
        className={`mt-4 text-start text-sm  ${
          changeType === "positive" ? "text-[#00B69B]" : "text-red-400"
        }`}
      >
        <span className="font-medium flex">
          {" "}
          <TrendIcon className="h-4 w-4 mr-1" />
          {change}
          <span className="text-white">{text}</span>
        </span>
      </div>
    </div>
  );
}
