import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./appLayout/layout";
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
import portrait1 from "./assets/images/portrait1.jpg";
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



function App() {
  const [contacts, setNewContacts] = useState([
    {
      name: "Jason Price",
      email: "jathsons.primy@ymosk.com",
      imageSrc: portrait1,
    },
    {
      name: "Duane Dean",
      email: "kutt.dartstoll@stdca.to",
      imageSrc: portrait1,
    },
    {
      name: "Jonathan Barner",
      email: "tora_handy@zimbio.biz",
      imageSrc: portrait1,
    },
    {
      name: "Rosie Glover",
      email: "brknows.morselo@homail.com",
      imageSrc: portrait1,
    },
    {
      name: "Patrick Greer",
      email: "opwili.ngranvt@bevrlo.net",
      imageSrc: portrait1,
    },
    {
      name: "Darrell Ortega",
      email: "rahul.shalashaska@ynho.info",
      imageSrc: portrait1,
    },
  ])

  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Leslie Alexa",
      role: "CEO",
      imageSrc: portrait1,
      mail: "jameson.smith@example.com",
    },
    {
      name: "Joshua Reed",
      role: "UX Designer",
      imageSrc: portrait1,
    },
    {
      name: "Carla Scnhez",
      role: "HR",
      imageSrc: portrait1,
      mail: "lucy@fakemail.net",
    },
    {
      name: "Arlene Mckinney",
      role: "CFO",
      imageSrc: portrait1,
      mail: "xful.example@fakemail.net",
    },
    {
      name: "Marrie Jones",
      role: "Developer",
      imageSrc: portrait1,
      mail: "frrtes@fakemail.net",
    },
    {
      name: "Darlene Robts",
      role: "Designer",
      imageSrc: portrait1,
      mail: "dmfn@fakemail.com",
    },
    {
      name: "Ronald Richards",
      role: "Designer",
      imageSrc: portrait1,
      mail: "musan@fakemail.com",
    },
    {
      name: "Maisha Berry",
      role: "Designer",
      imageSrc: portrait1,
      mail: "isaqq@fakemail.com",
    },
    {
      name: "Elly Tramos",
      role: "Marketing",
      imageSrc: portrait1,
      mail: "werr@iicon.com",
    },
    {
      name: "Howard Atkins",
      role: "CTO",
      imageSrc: portrait1,
      mail: "trropolis@iicon.com",
    },
    {
      name: "Eliza Hamertons",
      role: "CIO",
      imageSrc: portrait1,
      mail: "eliza@iicon.com",
    },
    {
      name: "Kassim Poplar",
      role: "CMO",
      imageSrc: portrait1,
      mail: "kassim@iicon.com",
    },
  ]);

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

      const [events, setEvents] = useState([
        {
          id: 1,
          title: "Design Conference",
          date: new Date(2024, 9, 7),
          time: "07:19 AM",
          location: "56 Devlon Mission Suite 157",
          attendees: 3,
          image: designConf,
        },
        {
          id: 2,
          title: "Weekend Festival",
          date: new Date(2024, 9, 18),
          time: "8:00 PM",
          location: "853 Moore Flats Suite 168",
          attendees: 3,
          image: meeting,
        },
        {
          id: 3,
          title: "Glastonbury Festival",
          date: new Date(2024, 9, 25),
          time: "9:30 PM",
          location: "846 Walter Road Apt. 571",
          attendees: 3,
          image: festival,
        },
        {
          id: 4,
          title: "Ultra Europe 2024",
          date: new Date(2024, 9, 29),
          time: "10:00 PM",
          location: "906 Sutterfield Tunnel Apt. 963",
          attendees: 2,
          image: festival,
        },
      ]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
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
          path: "/ui-elements",
          element: <UIElement />,
        },
        {
          path: "/table",
          element: <Table />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
