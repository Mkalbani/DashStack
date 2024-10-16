import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";

const ProductCard = ({ product, textColor }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="bg-bgColor rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-1/2 left-2 bg-gray-800 text-white rounded-full p-1">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute top-1/2 right-2 bg-gray-800 text-white rounded-full p-1">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="p-4">
        <span className="flex justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button
            onClick={toggleLike}
            className=" p-2 w-9 h-9 bg-gray-700 text-white rounded-full"
          >
            <Heart
              size={20}
              className={isLiked ? "text-red-500" : textColor}
              fill={isLiked ? "currentColor" : "none"}
            />
            <div className=" inset-x-0  h-1/2 bg-gray-700 rounded-b-full"></div>
          </button>
        </span>
        <p className="text-blue-500 font-bold">${product.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
            />
          ))}
          <span className="text-gray-500 ml-2">({product.reviews})</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-2xl">
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
