import React, { useState } from "react";

const promotions = [
  {
    date: "September 12-22",
    title: "Enjoy free home delivery in this summer",
    description: "Designer Dresses - Pick from trendy Designer Dress.",
  },
  {
    date: "October 1-15",
    title: "Fall collection now available",
    description: "Cozy sweaters and stylish boots for the autumn season.",
  },
  {
    date: "November 5-20",
    title: "Pre-holiday sale event",
    description: "Get ready for the holidays with our special discounts.",
  },
];

const PromotionalCardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPromotion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
  };

  const prevPromotion = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + promotions.length) % promotions.length
    );
  };

  const currentPromo = promotions[currentIndex];

  return (
    <div className="bg-dash rounded-3xl p-8 text-white relative h-80 flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between ">
        <div className="flex flex-col p-10 justify-center ">
          <p className="text-sm mb-2">{currentPromo.date}</p>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            {currentPromo.title}
          </h2>
          <p className="mb-6">{currentPromo.description}</p>
        </div>
        <button className="bg-orange-500 ml-8 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-600 transition duration-300 self-start">
          Get Started
        </button>
      </div>

      <button
        onClick={prevPromotion}
        className="absolute text-black left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-500 rounded-full p-2  transition duration-300"
        aria-label="Previous promotion"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextPromotion}
        className="absolute text-black right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-500 rounded-full p-2  transition duration-300"
        aria-label="Next promotion"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default PromotionalCardCarousel;
