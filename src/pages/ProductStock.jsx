import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import appleWatch from "../assets/images/appleWatch.svg";

const products = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 400.0,
    stock: 63,
    colors: ["red", "black", "white"],
  },
  {
    id: 2,
    name: "Microsoft Headphones",
    category: "Digital Product",
    price: 190.0,
    stock: 13,
    colors: ["blue", "yellow", "black", "white"],
  },
  {
    id: 3,
    name: "Women's Dress",
    category: "Fashion",
    price: 840.0,
    stock: 635,
    colors: ["pink", "blue", "purple"],
  },
  {
    id: 4,
    name: "Samsung A50",
    category: "Mobile",
    price: 400.0,
    stock: 87,
    colors: ["blue", "black"],
  },
  {
    id: 5,
    name: "Camera",
    category: "Electronic",
    price: 420.0,
    stock: 52,
    colors: ["red", "black"],
  },
  {
    id: 6,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 400.0,
    stock: 63,
    colors: ["red", "black", "white"],
  },
  {
    id: 7,
    name: "Microsoft Headphones",
    category: "Digital Product",
    price: 190.0,
    stock: 13,
    colors: ["blue", "yellow", "black", "white"],
  },
  {
    id: 8,
    name: "Women's Dress",
    category: "Fashion",
    price: 840.0,
    stock: 635,
    colors: ["pink", "blue", "purple"],
  },
  {
    id: 9,
    name: "Samsung A50",
    category: "Mobile",
    price: 400.0,
    stock: 87,
    colors: ["blue", "black"],
  },
  {
    id: 10,
    name: "Camera",
    category: "Electronic",
    price: 420.0,
    stock: 52,
    colors: ["red", "black"],
  },
];

const Alert = ({ message }) => (
  <div className="bg-green-500 text-white p-3 rounded mb-4">{message}</div>
);

const ProductStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productList, setProductList] = useState(products);
  const [alertMessage, setAlertMessage] = useState("");

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    setProductList(productList.filter((product) => product.id !== id));
    setAlertMessage("Product deleted successfully");
  };

  const handleSave = (editedProduct) => {
    setProductList(
      productList.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
    setEditingProduct(null);
    setAlertMessage("Product updated successfully");
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="bg-gray-900 text-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 ">
        <h1 className="text-2xl font-semibold text-white mb-6 ">
          Product Stock
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search product name"
            className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-full sm:px-3 sm:py-1 sm:text-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute right-3 top-2 text-gray-400" size={20} />
        </div>
      </div>
      {alertMessage && <Alert message={alertMessage} />}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr className="text-left bg-gray-700 text-sm">
              <th className="p-3 rounded-tl-2xl text-sm">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Available Color</th>
              <th className="p-3 rounded-tr-2xl text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {currentItems.map((product) => (
              <tr key={product.id} className="border-b border-gray-700 ">
                <td className="p-3 text-sm">{product.id}</td>
                <td className="p-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg">
                    <img src={appleWatch} />
                  </div>
                </td>
                <td className="p-3 text-sm">{product.name}</td>
                <td className="p-3 text-sm">{product.category}</td>
                <td className="p-3 text-sm">${product.price.toFixed(2)}</td>
                <td className="p-3 text-sm">{product.stock}</td>
                <td className="p-3 text-sm">
                  <div className="flex space-x-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full bg-${color}-500`}
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-sm">
                  <button onClick={() => handleEdit(product)} className="mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="bg-gray-700 text-white px-4 py-2 rounded mb-2 w-full"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="bg-gray-700 text-white px-4 py-2 rounded mb-2 w-full"
            />
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: parseInt(e.target.value),
                })
              }
              className="bg-gray-700 text-white px-4 py-2 rounded mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editingProduct)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStock;
