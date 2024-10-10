import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Download, Info, Trash2 } from "lucide-react";
import EmailItem from "./EmailItem";
import Chat from "./Chat";

const EmailList = ({
  emails,
  selectedEmails,
  toggleEmailSelection,
  toggleStar,
  deleteSelectedEmails,
  searchTerm,
  setSearchTerm,
  currentFolder,
  selectedLabels,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const containerHeight = document.querySelector(
        ".email-list-container"
      )?.clientHeight;
      const emailItemHeight = 70;
      const newItemsPerPage = Math.floor(containerHeight / emailItemHeight);
      setItemsPerPage(Math.max(newItemsPerPage, 1));
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFolder =
      currentFolder === "starred"
        ? email.starred
        : email.folder === currentFolder;

    const matchesLabel =
      selectedLabels.length === 0 || selectedLabels.includes(email.label);

    return matchesSearch && matchesFolder && matchesLabel;
  });

  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseChat = () => {
    setSelectedEmail(null);
  };

  const handleDeleteEmail = (emailId) => {
    deleteSelectedEmails([emailId]);
    handleCloseChat();
  };

  const handlePrintEmail = (email) => {
    console.log("Printing email:", email);
  };

  return (
    <div className="flex-1 p-4 bg-gray-800 ml-5 rounded-2xl flex flex-col">
      {selectedEmail ? (
        <Chat
          email={selectedEmail}
          onClose={handleCloseChat}
          onDelete={() => handleDeleteEmail(selectedEmail.id)}
          onPrint={() => handlePrintEmail(selectedEmail)}
        />
      ) : (
        <>
          <div className="mb-4 flex items-center">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search mail"
                className="w-1/2 bg-gray-700 text-white p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex ml-2">
              <button
                className="p-2 bg-gray-700 rounded-full ml-2"
                onClick={() => alert("Image attachment")}
              >
                <Download size={20} />
              </button>
              <button
                className="p-2 bg-gray-700 rounded-full ml-2"
                onClick={() => alert("Info")}
              >
                <Info size={20} />
              </button>
              <button
                className="p-2 bg-gray-700 rounded-full ml-2"
                onClick={deleteSelectedEmails}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="email-list-container flex-grow overflow-hidden">
            <div className="space-y-2">
              {currentEmails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  isSelected={selectedEmails.includes(email.id)}
                  toggleEmailSelection={toggleEmailSelection}
                  toggleStar={toggleStar}
                  onClick={() => handleEmailClick(email)}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredEmails.length)} of{" "}
              {filteredEmails.length}
            </span>
            <div className="flex items-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-1 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-1 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailList;
