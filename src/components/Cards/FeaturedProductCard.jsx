import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FeaturedProductCard = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg relative">
      <h2 className="text-white text-lg font-semibold mb-4">
        Featured Product
      </h2>

      {/* Arrows */}
      <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
        <ArrowLeft size={24} />
      </button>

      <div className="text-center">

        <img
          src=""
          alt="Product"
          className="mx-auto mb-4 w-40 h-40 object-cover rounded-lg"
        />
        <h3 className="text-white text-lg ">
          Beats Headphone 2019
        </h3>
        <p className="text-yellow-500 text-xl font-bold mt-2">$89.00</p>
      </div>

      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default FeaturedProductCard;
