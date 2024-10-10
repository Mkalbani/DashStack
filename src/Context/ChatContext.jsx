// import React, { createContext, useContext, useState, useEffect } from "react";

// const ChatContext = createContext();

// export const useChatContext = () => useContext(ChatContext);

// export const ChatProvider = ({ children }) => {
//   const [chats, setChats] = useState({});
//   const [currentChatId, setCurrentChatId] = useState(null);

//   const addMessage = (chatId, message) => {
//     setChats((prevChats) => ({
//       ...prevChats,
//       [chatId]: {
//         ...prevChats[chatId],
//         messages: [...(prevChats[chatId]?.messages || []), message],
//       },
//     }));
//   };

//   const toggleStar = (chatId) => {
//     setChats((prevChats) => ({
//       ...prevChats,
//       [chatId]: {
//         ...prevChats[chatId],
//         starred: !prevChats[chatId].starred,
//       },
//     }));
//   };

//   const deleteChat = (chatId) => {
//     setChats((prevChats) => {
//       const newChats = { ...prevChats };
//       delete newChats[chatId];
//       return newChats;
//     });
//     if (currentChatId === chatId) {
//       setCurrentChatId(null);
//     }
//   };

//   const openChat = (chatId, initialData) => {
//     if (!chats[chatId]) {
//       setChats((prevChats) => ({
//         ...prevChats,
//         [chatId]: initialData,
//       }));
//     }
//     setCurrentChatId(chatId);
//   };

//   const closeChat = () => {
//     setCurrentChatId(null);
//   };

//   // Simulated API call to fetch chats
//   useEffect(() => {
//     const fetchChats = async () => {
//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Simulated chat data
//       const initialChats = {
//         1: {
//           id: "1",
//           sender: "Minerva Barnett",
//           label: "Work",
//           starred: false,
//           messages: [
//             {
//               id: "1",
//               text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. This point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
//               sender: "Minerva Barnett",
//               time: "6:30 pm",
//             },
//             {
//               id: "2",
//               text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
//               sender: "You",
//               time: "6:34 pm",
//             },
//             {
//               id: "3",
//               text: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text. Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
//               sender: "Minerva Barnett",
//               time: "6:38 pm",
//             },
//           ],
//         },
//         // Add more initial chats as needed
//       };
//       setChats(initialChats);
//     };

//     fetchChats();
//   }, []);

//   return (
//     <ChatContext.Provider
//       value={{
//         chats,
//         currentChatId,
//         addMessage,
//         toggleStar,
//         deleteChat,
//         openChat,
//         closeChat,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
