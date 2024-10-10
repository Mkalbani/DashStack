import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const categoryMapping = {
  "Health & Medicine": ["Medicine"],
  "Book & Stationary": ["Book"],
  "Services & Industry": ["Consulting"],
  "Fashion & Beauty": ["Clothing", "Cosmetics"],
  "Home & Living": ["Furniture", "Decor"],
  "Electronics": ["Electric"],
  "Mobile & Phone": ["Mobile"],
  "Accessories": ["Watch"],
};

// Create a reverse mapping from order types to categories
const typeToCategory = Object.entries(categoryMapping).reduce(
  (acc, [category, types]) => {
    types.forEach((type) => {
      acc[type] = category;
    });
    return acc;
  },
  {}
);

const SelectOrderModal = ({
  isOpen,
  onClose,
  onApply,
  initialSelectedTypes = [],
}) => {
  const [selectedTypes, setSelectedTypes] = useState(initialSelectedTypes);

  useEffect(() => {
    setSelectedTypes(initialSelectedTypes);
  }, [initialSelectedTypes]);

  const toggleOrderType = (category, types) => {
    setSelectedTypes((prev) => {
      const newTypes = types.filter((type) => !prev.includes(type));
      const typesToRemove = types.filter((type) => prev.includes(type));
      return [...prev.filter((t) => !typesToRemove.includes(t)), ...newTypes];
    });
  };

  const handleApply = () => {
    onApply(selectedTypes);
    onClose();
  };

  const isCategorySelected = (types) => {
    return types.some((type) => selectedTypes.includes(type));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Select Order Type
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(categoryMapping).map(([category, types]) => (
            <button
              key={category}
              onClick={() => toggleOrderType(category, types)}
              className={`py-2 px-3 rounded-md text-sm ${
                isCategorySelected(types)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-4">
          *You can choose multiple Order types
        </p>
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default SelectOrderModal;
