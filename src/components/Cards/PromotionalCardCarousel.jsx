import React, { useState } from "react";

const promotions = [
  {
    date: "September 12-22",
    title: "Enjoy free home ",
    titleBreak: "delivery in this summer",
    description: "Designer Dresses - Pick from trendy Designer Dress.",
  },
  {
    date: "October 1-15",
    title: "Fall collection ",
    titleBreak: "now available",
    description: "Cozy sweaters and stylish boots for the autumn season.",
  },
  {
    date: "November 5-20",
    title: "Pre-holiday ",
    titleBreak: "sale event",
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
    <div className="bg-dash rounded-3xl p-4 md:p-8 text-white relative h-72 md:h-80 flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col px-4 md:px-12 md:ml-5 justify-center">
          <p className="text-xs md:text-sm mb-1 md:mb-2">{currentPromo.date}</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            {currentPromo.title}
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            {currentPromo.titleBreak}
          </h2>
          <p className="text-xs md:text-base mb-4 md:mb-6">
            {currentPromo.description}
          </p>
        </div>

        <div className="md:ml-9">
          <button className="bg-orange-500 ml-4 md:ml-8 text-xs md:text-sm text-white py-2 md:py-3 px-6 md:px-8 rounded-md hover:bg-orange-600 transition duration-300 self-start">
            Get Started
          </button>
        </div>
      </div>

      <button
        onClick={prevPromotion}
        className="absolute text-black left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-500 rounded-full p-1 md:p-2 transition duration-300"
        aria-label="Previous promotion"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
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
        className="absolute text-black right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-500 rounded-full p-1 md:p-2 transition duration-300"
        aria-label="Next promotion"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
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
