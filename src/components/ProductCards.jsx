import ProductCard from "./Cards/ProductCard";
import watch from "../assets/images/product-watch.svg";

const ProductCards = () => {
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
