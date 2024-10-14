import React from "react";
import { Printer, Send } from "lucide-react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import { invoiceData } from "../services/data/invoiceData";


const Invoice = () => {
  const total = invoiceData.items.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  const handlePrint = () => {
    const element = document.getElementById("invoice");
    html2pdf().from(element).save("invoice.pdf");
  };

  const handleSend = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById("invoice"), {
      callback: function (pdf) {
        pdf.save("invoice.pdf");
      },
    });
  };

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 lg:p-1">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <div
        className="w-full bg-gray-800 text-white text-sm mx-auto p-5 rounded-lg"
        id="invoice"
      >
        {/* Responsive Flex Layout */}
        <div className="flex flex-col md:flex-row justify-between md:justify-evenly mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="font-semibold">Invoice From :</h2>
            <p>{invoiceData.from.name}</p>
            <p>{invoiceData.from.address}</p>
          </div>
          <div>
            <h2 className="font-semibold">Invoice To :</h2>
            <p>{invoiceData.to.name}</p>
            <p>{invoiceData.to.address}</p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Invoice Date :</span>{" "}
              {invoiceData.invoiceDate}
            </p>
            <p>
              <span className="font-semibold">Due Date :</span>{" "}
              {invoiceData.dueDate}
            </p>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full mb-8 text-left">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-700 text-xs sm:text-sm">
                <th className="py-2 px-2 sm:px-6">Serial No.</th>
                <th className="py-2">Description</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Base Cost</th>
                <th className="py-2">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-700 text-xs sm:text-sm"
                >
                  <td className="py-2 px-2 sm:px-6">{item.id}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">${item.basePrice}</td>
                  <td className="py-2">${item.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Total and Buttons */}
        <div className="flex justify-end ">
          <p className="text-l font-semibold mb-5 pr-10 ">Total = ${total}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:pr-28 ">
          {/* <p className="text-lg font-semibold hidden sm:in-line">Total = ${total}</p> */}
          <div className="flex space-x-4">
            <button
              className="bg-gray-700 text-white p-2 rounded"
              onClick={handlePrint}
            >
              <Printer size={24} />
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              onClick={handleSend}
            >
              <Send size={20} className="mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
