import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OrderTable = ({
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  enablePagination = true,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-grey bg-gray-700">
            <tr className="text-white font-light">
              <th className="text-left py-2 pl-4 rounded-tl-2xl text-sm">ID</th>
              <th className="text-left py-2 text-sm">NAME</th>
              <th className="text-left py-2 text-sm">ADDRESS</th>
              <th className="text-left py-2 text-sm">DATE</th>
              <th className="text-left py-2 text-sm">TYPE</th>
              <th className="text-left py-2 pr-4 rounded-tr-2xl text-sm">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {data.map((order) => (
              <tr key={order.id} className="border-t border-gray-700">
                <td className="py-3 text-gray-300 text-sm pl-4 whitespace-nowrap">
                  {order.id}
                </td>
                <td className="py-3 text-sm">
                  <span className="text-gray-300 whitespace-nowrap">
                    {order.name}
                  </span>
                </td>
                <td className="py-3 text-gray-300 text-sm">{order.address}</td>
                <td className="py-3 text-gray-300 text-sm whitespace-nowrap">
                  {order.date}
                </td>
                <td className="py-3 text-gray-300 text-sm whitespace-nowrap">
                  {order.type}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                      order.status === "Completed"
                        ? "bg-green-500"
                        : order.status === "Processing"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    } text-white`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {enablePagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-4">
          <span className="text-sm text-gray-400 mb-2 sm:mb-0">
            Showing {startIndex + 1}-{endIndex} of {totalItems}
          </span>
          <div className="flex space-x-2">
            <button
              className="p-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="p-2 bg-gray-700 rounded disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={endIndex === totalItems}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
