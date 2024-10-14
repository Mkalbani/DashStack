import React, { useEffect, useState } from "react";
import OrderTable from "../components/OrderTable";
import appleWatch from "../assets/images/appleWatch.svg";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { orderData } from "../components/OrderLists/orderData";


const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    date: "",
    orderType: [],
    orderStatus: "",
  });
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  const filteredData = orderData.filter((order) => {
    return (
      (filters.date === "" || order.date.includes(filters.date)) &&
      (filters.orderType.length === 0 || filters.orderType.includes(order.type))
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);



  // product stock
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
    }
  ];

    const [searchTerm, setSearchTerm] = useState("");
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
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">Table</h1>
      {/* {!isMobile && ( */}
        <OrderTable
          data={currentData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={(newPage) => setCurrentPage(newPage)}
          enablePagination={false}
        />
      {/* )} */}

      {/* product stock  */}
      <div className="overflow-x-auto text-white mt-5">
        <table className="w-full">
          <thead className="">
            <tr className="text-left text-white bg-gray-700 text-sm">
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
    </div>
  );
};

export default Table;
