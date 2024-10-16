import ProductCard from "./Cards/ProductCard";
import watch from "../assets/images/product-watch.svg";
import beat from "../assets/images/beats.avif";
import sony from "../assets/images/sony.avif";
import ipad from "../assets/images/ipad.avif"; 

const ProductCards = () => {
  const products = [
    {
      name: "iPad Pro",
      price: 120.0,
      rating: 4.5,
      reviews: 131,
      image: ipad,
      textColor: "text-white",
    },
    {
      name: "Sony WH-1000XM4",
      price: 45.3,
      rating: 4,
      reviews: 34,
      image: sony,
      textColor: "text-white",
    },
    {
      name: "Apple Watch Series 4",
      price: 75.0,
      rating: 4,
      reviews: 52,
      image: watch,
      textColor: "text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 text-white">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
