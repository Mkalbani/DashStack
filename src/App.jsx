import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Inbox from "./pages/Inbox";
import OrderLists from "./pages/OrderLists";
import ProductStock from "./pages/ProductStock";
import Pricing from "./pages/Pricing";
import Calendar from "./pages/Calendar";
import ToDoList from "./pages/ToDoList";
import Contacts from "./pages/Contact";
import Invoice from "./pages/Invoice";
import Team from "./pages/Team";
import UIElement from "./pages/UIElement";
import Table from "./pages/Table";
import AddTeamMember from "./components/AddTeamMember";
import { useState } from "react";
import AddEvent from "./components/AddNew/AddEvent";
import meeting from "./assets/images/meeting.avif";
import designConf from "./assets/images/designConf.avif";
import festival from "./assets/images/festival.webp";
import AddNewContact from "./components/AddNew/AddNewContact";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import PrivateRoutes from "./components/PrivateRoutes";
import SignIn from "./pages/SignIn";
import ManageAccount from "./components/ManageAccount";
import ChangePassword from "./components/ChangeAccount";
import ActivityLog from "./components/ActivityLog";
import { contactData } from "./services/data/contactData";
import { teamData } from "./services/data/teamData";
import { eventData } from "./services/data/eventData";

function App() {
  const [contacts, setNewContacts] = useState(contactData)

  const [teamMembers, setTeamMembers] = useState(teamData);

  const addNewMember = (newMember) => {
    setTeamMembers((prevMembers) => [...prevMembers, newMember]);
  };

  // add contact
  const AddNewContacts = (contact) => {
    setNewContacts((prevContacts) => [...prevContacts, contact]);}

  // add event 
    const handleAddEvent = (newEvent) => {
      newEvent.date = new Date(newEvent.date);

      setEvents([...events, newEvent]);
      setShowAddEvent(false);
    };
  const [showAddEvent, setShowAddEvent] = useState(false);

      const [events, setEvents] = useState(eventData);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoutes />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
        {
          path: "order-lists",
          element: <OrderLists />,
        },
        {
          path: "product-stock",
          element: <ProductStock />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "calendar",
          element: <Calendar events={events} />,
        },
        {
          path: "add-event",
          element: <AddEvent onAddEvent={handleAddEvent} />,
        },
        {
          path: "/to-do",
          element: <ToDoList />,
        },
        {
          path: "/contact",
          element: <Contacts contacts={contacts} />,
        },
        {
          path: "/add-new-contact",
          element: <AddNewContact onAddContact={AddNewContacts} />,
        },
        {
          path: "/invoice",
          element: <Invoice />,
        },
        {
          path: "/team",
          element: <Team members={teamMembers} />,
        },
        {
          path: "add-team-member",
          element: <AddTeamMember onAddMember={addNewMember} />,
        },

        {
          path: "ui-elements",
          element: <UIElement />,
        },
        {
          path: "table",
          element: <Table />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "signin",
      element: <SignIn />,
    },
    {
      path: "manage-account",
      element: <ManageAccount />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "activity-log",
      element: <ActivityLog />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
