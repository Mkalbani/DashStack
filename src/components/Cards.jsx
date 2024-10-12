import React from 'react';
import CustomersCard from './Cards/CustomersCard';
import FeaturedProductCard from './Cards/FeaturedProductCard';
import SalesAnalyticsCard from "./Charts/SalesAnalyticsCard";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
      <CustomersCard />
      <FeaturedProductCard />
      <SalesAnalyticsCard />
    </div>
  );
};

export default Cards;