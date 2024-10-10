import React from "react";

const FolderItem = ({ icon: Icon, name, count, folder, setCurrentFolder }) => (
  <div
    className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded"
    onClick={() => setCurrentFolder(folder)}
  >
    <span className="flex items-center">
      <Icon className="mr-2 " size={18} /> {name}
    </span>
    <span>{count}</span>
  </div>
);

export default FolderItem;
