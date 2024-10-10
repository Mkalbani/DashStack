import React, { useState } from "react";
import { X } from "lucide-react";

const orderStatuses = [
  "Completed",
  "Processing",
  "Rejected",
  "On Hold",
  "In Transit",
];

const SelectStatusModal = ({
  isOpen,
  onClose,
  onApply,
  initialSelectedStatuses = [],
}) => {
  const [selectedStatuses, setSelectedStatuses] = useState(
    initialSelectedStatuses
  );

  const toggleOrderStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApply(selectedStatuses);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Select Order Status
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {orderStatuses.map((status) => (
            <button
              key={status}
              onClick={() => toggleOrderStatus(status)}
              className={`py-2 px-3 rounded-md text-sm ${
                selectedStatuses.includes(status)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-4">
          *You can choose multiple Order Status
        </p>
        <button
          onClick={handleApply}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default SelectStatusModal;