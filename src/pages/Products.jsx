import React from 'react'
import PromotionalCardCarousel from '../components/Cards/PromotionalCardCarousel';
import ProductCards from '../components/ProductCards';

const Products = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">Products</h1>
      <div >
        <PromotionalCardCarousel />
        <ProductCards />
      </div>
    </div>
  );
}

export default Products