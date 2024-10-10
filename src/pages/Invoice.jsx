import React from "react";
import { Printer, Send } from "lucide-react";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

const invoiceData = {
  from: {
    name: "Virginia Walker",
    address: "9694 Krajcik Locks Suite 635",
  },
  to: {
    name: "Austin Miller",
    address: "Brookview",
  },
  invoiceDate: "12 Nov 2024",
  dueDate: "25 Dec 2024",
  items: [
    {
      id: 1,
      description: "Children Toy",
      quantity: 2,
      basePrice: 40,
      totalCost: 80,
    },
    {
      id: 2,
      description: "Makeup",
      quantity: 2,
      basePrice: 50,
      totalCost: 100,
    },
    {
      id: 3,
      description: "Asus Laptop",
      quantity: 5,
      basePrice: 100,
      totalCost: 500,
    },
    {
      id: 4,
      description: "Iphone X",
      quantity: 4,
      basePrice: 1000,
      totalCost: 4000,
    },
  ],
};

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
    <div className="bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Invoice</h1>
      <div
        className="w-full bg-gray-800 text-white text-sm mx-auto p-5"
        id="invoice"
      >
        <div className="flex justify-evenly mb-8">
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

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-700 text-sm">
              <th className="text-left py-2 px-6">Serial No.</th>
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Base Cost</th>
              <th className="text-left py-2">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 text-sm">
                <td className="py-2 px-10">{item.id}</td>
                <td className="py-2">{item.description}</td>
                <td className="py-2 px-5">{item.quantity}</td>
                <td className="py-2">${item.basePrice}</td>
                <td className="py-2 px-10">${item.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Align the total */}
        <div className="flex justify-end pr-28">
          <p className="text-l font-semibold mb-5 pr-10 ">Total = ${total}</p>
        </div>
        <div className="flex justify-end pr-28">
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