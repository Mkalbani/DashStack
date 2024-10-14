import designConf from "../../assets/images/designConf.avif";
import festival from "../../assets/images/festival.webp";
import meeting from "../../assets/images/meeting.avif";

export const eventData = [
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
];