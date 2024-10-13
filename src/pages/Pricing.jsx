import React, { useState } from "react";

const PricingTier = ({ title, price, features, isHighlighted, onClick }) => (
  <div
    className={`flex flex-col p-6 bg-gray-800 rounded-3xl text-sm cursor-pointer ${
      isHighlighted ? "border-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
    <p className="text-3xl font-bold text-blue-500 mb-12">${price}</p>
    <ul className="flex-grow space-y-2 mb-12">
      {features.map((feature, index) => (
        <li
          key={index}
          className={`text-sm ${
            feature.active ? "text-white " : "text-gray-400"
          }`}
        >
          {feature.name}
        </li>
      ))}
    </ul>
    <button
      className={`py-2 px-4 rounded-3xl ${
        isHighlighted ? "bg-blue-500 text-white" : "bg-gray-700 text-blue-500"
      }`}
    >
      Get Started
    </button>
    <p className="text-xs text-gray-400 mt-4">Start Your 30 Day Free Trial</p>
  </div>
);

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState(null); 

  const tiers = [
    {
      title: "Basic",
      price: "14.99",
      features: [
        { name: "Free Setup", active: true },
        { name: "Bandwidth Limit 10 GB", active: true },
        { name: "20 User Connection", active: true },
        { name: "Analytics Report", active: false },
        { name: "Public API Access", active: false },
        { name: "Plugins Integration", active: false },
        { name: "Custom Content Management", active: false },
      ],
    },
    {
      title: "Standard",
      price: "49.99",
      features: [
        { name: "Free Setup", active: true },
        { name: "Bandwidth Limit 10 GB", active: true },
        { name: "20 User Connection", active: true },
        { name: "Analytics Report", active: true },
        { name: "Public API Access", active: true },
        { name: "Plugins Integration", active: false },
        { name: "Custom Content Management", active: false },
      ],
    },
    {
      title: "Premium",
      price: "89.99",
      features: [
        { name: "Free Setup", active: true },
        { name: "Bandwidth Limit 10 GB", active: true },
        { name: "20 User Connection", active: true },
        { name: "Analytics Report", active: true },
        { name: "Public API Access", active: true },
        { name: "Plugins Integration", active: true },
        { name: "Custom Content Management", active: true },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen ">
      <h1 className="text-2xl font-semibold text-white mb-6">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {tiers.map((tier, index) => (
          <PricingTier
            key={index}
            title={tier.title}
            price={tier.price}
            features={tier.features}
            isHighlighted={selectedTier === index} 
            onClick={() => setSelectedTier(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
