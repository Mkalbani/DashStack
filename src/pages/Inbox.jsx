import React, { useState } from "react";
import EmailList from "../components/Inbox/EmailList";
import ComposeEmail from "../components/Inbox/ComposeEmail";
import Sidebar from "../components/Inbox/SideBar";
import { initialEmailData, initialLabels } from "../components/Inbox/Data";

const Inbox = () => {
  const [emails, setEmails] = useState(initialEmailData);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [labels, setLabels] = useState(initialLabels);
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const toggleEmailSelection = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const toggleStar = (id) => {
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const deleteSelectedEmails = () => {
    setEmails((prev) =>
      prev.map((email) =>
        selectedEmails.includes(email.id) ? { ...email, folder: "bin" } : email
      )
    );
    setSelectedEmails([]);
  };

  const addNewEmail = (newEmail) => {
    setEmails((prev) => [
      { ...newEmail, id: prev.length + 1, folder: "sent" },
      ...prev,
    ]);
  };

  const addNewLabel = (newLabelName) => {
    if (newLabelName && !labels.includes(newLabelName)) {
      setLabels((prev) => [...prev, newLabelName]);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-white mb-6">Inbox</h1>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar
          labels={labels}
          addNewLabel={addNewLabel}
          setCurrentFolder={setCurrentFolder}
          setComposeOpen={setComposeOpen}
          emails={emails}
          selectedLabels={selectedLabels}
          setSelectedLabels={setSelectedLabels}
        />
        <EmailList
          emails={emails}
          selectedEmails={selectedEmails}
          toggleEmailSelection={toggleEmailSelection}
          toggleStar={toggleStar}
          deleteSelectedEmails={deleteSelectedEmails}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentFolder={currentFolder}
          selectedLabels={selectedLabels}
        />
        {composeOpen && (
          <ComposeEmail
            addNewEmail={addNewEmail}
            setComposeOpen={setComposeOpen}
            labels={labels}
          />
        )}
      </div>
    </>
  );
};

export default Inbox;
