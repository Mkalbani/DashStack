import React, { useState, useEffect } from "react";
import {
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
  ChevronDown,
} from "lucide-react";
import Calendar from "../components/OrderLists/Calendar";
import SelectOrderModal from "../components/OrderLists/SelectOrderModal";
import SelectStatusModal from "../components/OrderLists/SelectStatusModal";
import OrderTable from "../components/OrderTable";
import { orderData, typeToCategory } from "../components/OrderLists/orderData";


const OrderLists = () => {
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState([]);

  const [filters, setFilters] = useState({
    date: "",
    orderType: [],
    orderStatus: "",
  });
  // const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 9;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleOpenOrderTypeModal = () => {
    setIsOrderTypeModalOpen(true);
  };

  const handleApplyOrderTypes = (types) => {
    setSelectedOrderTypes(types);
    setFilters((prev) => ({ ...prev, orderType: types }));
    setCurrentPage(1);
  };

  const filteredData = orderData.filter((order) => {
    return (
      (filters.date === "" || order.date.includes(filters.date)) &&
      (filters.orderType.length === 0 ||
        filters.orderType.includes(order.type)) &&
      (selectedOrderStatuses.length === 0 ||
        selectedOrderStatuses.includes(order.status))
    );
  });
  // const matchesOrderStatus =
  //   selectedOrderStatuses.length === 0 ||
  //   selectedOrderStatuses.includes(order.status);

  //   return (
  //     (selectedDates.length === 0 ||
  //       selectedDates.some(
  //         (date) => date.toDateString() === orderDate.toDateString()
  //       )) &&
  //     matchesOrderType &&
  //     matchesOrderStatus
  //   );
  // });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleOpenOrderStatusModal = () => {
    setIsOrderStatusModalOpen(true);
  };

  const resetFilters = () => {
    setFilters({ date: "", orderType: [], orderStatus: "" });
    setSelectedOrderTypes([]);
    setCurrentPage(1);
    setSelectedOrderStatuses([]);
  };

  const handleDateSelect = (date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, "0")} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][date.getMonth()]
    } ${date.getFullYear()}`;
    handleFilterChange("date", formattedDate);
  };

  const getSelectedCategoriesDisplay = () => {
    const categories = [
      ...new Set(selectedOrderTypes.map((type) => typeToCategory[type])),
    ];
    return categories.join(", ");
  };

  const handleApplyOrderStatuses = (statuses) => {
    setSelectedOrderStatuses(statuses);
    setCurrentPage(1);
  };

  const renderMobileCard = (order) => (
    <div key={order.id} className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm">ID: {order.id}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            order.status === "Completed"
              ? "bg-green-500"
              : order.status === "Processing"
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white`}
        >
          {order.status}
        </span>
      </div>
      <h3 className="text-white font-semibold mb-1">{order.name}</h3>
      <p className="text-gray-400 text-sm mb-1">{order.address}</p>
      <p className="text-gray-400 text-sm mb-1">{order.date}</p>
      <p className="text-gray-400 text-sm">{order.type}</p>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white">
      <h1 className="text-2xl font-semibold text-white mb-6">Order Lists</h1>

      {/* Filter Controls */}
      <div className="lg:inline-flex md:inline-flex  mb-4 bg-gray-800 rounded-md overflow-hidden flex flex-col md:flex-row">
        <div className="flex items-center justify-center px-4 py-2 md:py-0 md:border-r border-gray-700">
          <Filter size={20} className="text-gray-400" />
        </div>
        <div className="flex items-center px-4 py-2 md:py-0 text-gray-400 md:border-r border-gray-700">
          Filter By
        </div>
        <div className="relative flex items-center border-b md:border-b-0 md:border-r border-gray-700">
          <button
            className="appearance-none bg-transparent text-white py-2 px-4 w-full md:w-auto text-left flex gap-2"
            onClick={() => setIsCalendarOpen(true)}
          >
            {filters.date || "Date"}
            <ChevronDown size={16} />
          </button>
        </div>
        <div className="relative flex items-center border-r border-gray-700">
          <button
            className="appearance-none bg-transparent text-white py-2 px-4 w-full text-left"
            onClick={handleOpenOrderTypeModal}
          >
            {selectedOrderTypes.length > 0
              ? `${selectedOrderTypes.length} type${
                  selectedOrderTypes.length > 1 ? "s" : ""
                } selected`
              : "Order Type"}
          </button>
        </div>

        <SelectOrderModal
          isOpen={isOrderTypeModalOpen}
          onClose={() => setIsOrderTypeModalOpen(false)}
          onApply={handleApplyOrderTypes}
          initialSelectedTypes={selectedOrderTypes}
        />

        <SelectStatusModal
          isOpen={isOrderStatusModalOpen}
          onClose={() => setIsOrderStatusModalOpen(false)}
          onApply={handleApplyOrderStatuses}
          initialSelectedStatuses={selectedOrderStatuses}
        />

        <div className="relative flex items-center border-r border-gray-700">
          <button
            className="appearance-none bg-transparent text-white py-2 px-4 w-full text-left"
            onClick={handleOpenOrderStatusModal}
          >
            {selectedOrderStatuses.length > 0
              ? `${selectedOrderStatuses.length} status${
                  selectedOrderStatuses.length > 1 ? "es" : ""
                } selected`
              : "Order Status"}
          </button>
        </div>
        <button
          className="flex items-center justify-center bg-gray-800 text-orange-500 px-4 py-2 hover:bg-gray-700 transition-colors duration-200 w-full md:w-auto"
          onClick={resetFilters}
        >
          <RefreshCcw size={16} className="mr-2" /> Reset Filter
        </button>
      </div>

      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={handleDateSelect}
      />
      {/* {!isMobile && ( */}
        <OrderTable
          data={currentData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      {/* )} */}
    </div>
  );
};

export default OrderLists;
