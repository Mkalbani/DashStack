import React from 'react'
import watch from "../assets/images/product-watch.svg";
import ProductCard from '../components/Cards/ProductCard';
import beat from "../assets/images/beats.avif";
import sony from "../assets/images/sony.avif";
import ipad from "../assets/images/ipad.avif"; 
import iphone from "../assets/images/iphone.avif"; 
import mouse from "../assets/images/mouse.avif"; 

const Favorites = () => {
  const textColor = "text-red-500";

      const products = [
        {
          name: "iPhone",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: iphone,
          textColor,
        },
        {
          name: "Sony WH-1000XM4",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: sony,
          textColor,
        },
        {
          name: "Beats Headphone",
          price: 75.0,
          rating: 4,
          reviews: 52,
          image: beat,
          textColor,
        },
        {
          name: "iPad Pro",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: ipad,
          textColor,
        },
        {
          name: "Gumbo Mouse",
          price: 45.3,
          rating: 4,
          reviews: 34,
          image: mouse,
          textColor,
        },
        {
          name: "Apple Watch Series 4",
          price: 120.0,
          rating: 4.5,
          reviews: 131,
          image: watch,
          textColor,
        },
      ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 text-white">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} textColor={textColor} />
        ))}
      </div>
    </div>
  );
}

export default Favorites