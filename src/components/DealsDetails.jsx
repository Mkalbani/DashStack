import React from "react";
import MonthBtn from "../ui/MonthBtn";
import watchImg from "../assets/icons/watch.svg";

const DealsDetails = () => {
  const deals = [
    {
      productImage: watchImg,
      productName: "Apple Watch",
      location: "6096 Marjolaine Landing",
      dateTime: "12.09.2019 - 12:53 PM",
      piece: 423,
      amount: 34295,
      status: "Delivered",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-5">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Deals Details</h2>
        <MonthBtn />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          {" "}
          {/* Adjusted min-width */}
          <thead className="bg-tHead rounded-3xl">
            <tr className="text-white font-light">
              <th className="text-left py-2 pl-4 rounded-l-2xl">
                Product Name
              </th>
              <th className="text-left py-2">Location</th>
              <th className="text-left py-2">Date - Time</th>
              <th className="text-left py-2">Piece</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2 pr-4 rounded-r-2xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-3 flex items-center text-sm">
                  <img
                    src={deal.productImage}
                    alt={deal.productName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-gray-300">{deal.productName}</span>
                </td>
                <td className="py-3 text-gray-300 text-sm">{deal.location}</td>
                <td className="py-3 text-gray-300 text-sm">{deal.dateTime}</td>
                <td className="py-3 text-gray-300 text-sm">{deal.piece}</td>
                <td className="py-3 text-gray-300 text-sm">
                  ${deal.amount.toLocaleString()}
                </td>
                <td className="py-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsDetails;
