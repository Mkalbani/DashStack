import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import beat from "../../assets/images/beats.avif"; 
import sony from "../../assets/images/sony.avif"; 
import hp from "../../assets/images/hp.webp"; 

const products = [
  { name: "Beats Headphone 2019", price: "$89.00", image: beat },
  { name: "Sony WH-1000XM4", price: "$299.00", image: sony },
  { name: "HP OmniBook", price: "$249.00", image: hp },
];

const FeaturedProductCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg relative">
      <h2 className="text-white text-lg font-semibold mb-4">
        Featured Product
      </h2>

      {/* Left Arrow */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={handlePrev}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Product Display */}
      <div className="text-center">
        <img
          src={products[currentIndex].image}
          alt={products[currentIndex].name}
          className="mx-auto mb-4 w-40 h-40 object-cover rounded-lg"
        />
        <h3 className="text-white text-lg">{products[currentIndex].name}</h3>
        <p className="text-yellow-500 text-xl font-bold mt-2">
          {products[currentIndex].price}
        </p>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={handleNext}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default FeaturedProductCard;
