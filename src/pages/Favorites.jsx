import React from 'react'
import watch from "../assets/images/product-watch.svg";
import ProductCard from '../components/Cards/ProductCard';

const Favorites = () => {
      const products = [
        {
          name: "Apple Watch Series 4",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: watch,
        },
        {
          name: "Girl Handy Beg",
          price: 45.3,
          rating: 4,
          reviews: 34,
          image: watch,
        },
        {
          name: "Beats Headphone",
          price: 75.0,
          rating: 4,
          reviews: 52,
          image: watch,
        },
        {
          name: "Amazfit Vip",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: watch,
        },
        {
          name: "Gumbo Mouse",
          price: 45.3,
          rating: 4,
          reviews: 34,
          image: watch,
        },
        {
          name: "Camera Tripod",
          price: 75.0,
          rating: 4,
          reviews: 52,
          image: watch,
        },
      ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 text-white">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Favorites