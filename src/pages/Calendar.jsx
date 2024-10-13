import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Users, X, Menu } from "lucide-react";import AddEvent from "../components/AddNew/AddEvent";
import { Link } from "react-router-dom";

const Calendar = ({ events: initialEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const [showSidebar, setShowSidebar] = useState(false);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const [visibleEvents, setVisibleEvents] = useState(4);

  const addNewEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      date: new Date(),
      time: "12:00 PM",
      location: "TBD",
      attendees: 1,
      image: "/api/placeholder/400/300",
    };
    setEvents([...events, newEvent]);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );
      days.push(
        <div
          key={day}
          className="min-h-24 border-t border-gray-700 p-1 relative"
        >
          <div className="text-sm text-gray-400">{day}</div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs bg-purple-800 bg-opacity-50 p-1 mt-1 rounded cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = events.filter(
      (event) => event.date.toDateString() === currentDate.toDateString()
    );

    return (
      <div className="grid grid-cols-[auto,1fr] gap-2">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-right pr-2 text-sm text-gray-400">{`${hour
              .toString()
              .padStart(2, "0")}:00`}</div>
            <div className="border-t border-gray-700 relative h-12">
              {dayEvents
                .filter((event) => new Date(event.date).getHours() === hour)
                .map((event) => (
                  <div
                    key={event.id}
                    className="absolute top-0 left-0 right-0 bg-purple-800 bg-opacity-50 p-1 text-xs rounded cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dayEvents = events.filter(
        (event) => event.date.toDateString() === day.toDateString()
      );
      days.push(
        <div key={i} className="border-t border-gray-700 p-1">
          <div className="text-sm text-gray-400">{day.getDate()}</div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs bg-purple-800 bg-opacity-50 p-1 mt-1 rounded cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const getDayName = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-full md:w-1/4 p-4 bg-gray-800 rounded-2xl`}
      >
        <Link to="/add-event">
          <button className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md flex items-center mb-4 w-full justify-center">
            <Plus size={16} className="mr-2" /> Add New Event
          </button>
        </Link>

        <div className="text-md mb-4 border-b border-gray-700 pb-2">
          You are going to
        </div>
        {events.slice(0, visibleEvents).map((event) => (
          <div key={event.id} className="mb-4 border-b border-gray-700 pb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
              <div>
                <div className="font-semibold">{event.title}</div>
                <div className="text-xs text-gray-400">
                  {event.date.toDateString() === new Date().toDateString()
                    ? `Today at ${event.time}`
                    : `${event.date.toLocaleDateString()} at ${event.time}`}
                </div>
                <div className="text-xs text-gray-400">{event.location}</div>
              </div>
            </div>
            <div className="flex mt-2">
              {[...Array(event.attendees)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gray-700 rounded-full -ml-2 first:ml-0"
                ></div>
              ))}
              <div
                className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center -ml-2 cursor-pointer"
                onClick={() => setShowAllMembers(true)}
              >
                <Users size={12} />
              </div>
            </div>
          </div>
        ))}
        {visibleEvents < events.length && (
          <button
            className="text-blue-500 text-sm rounded-md"
            onClick={() => setVisibleEvents((prev) => prev + 4)}
          >
            See More
          </button>
        )}
      </div>

      {/* Main Calendar Area */}
      <div className="w-full md:w-3/4 p-4 bg-gray-800 rounded-2xl mt-4 md:mt-0 md:ml-4">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          {/* Menu button for mobile */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          {/* Left Section: Day Label */}
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">
              {currentDate.toDateString() === new Date().toDateString()
                ? "Today"
                : getDayName(currentDate)}
            </span>
          </div>

          {/* Center Section: Month and Navigation Buttons */}
          <div className="flex items-center justify-center my-2 w-full sm:w-auto">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <ChevronLeft />
            </button>
            <div className="mx-4 font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <ChevronRight />
            </button>
          </div>

          {/* Right Section: View Mode Buttons */}
          <div className="flex text-sm bg-gray-700 rounded-md">
            <button
              className={`px-2 py-1 ${viewMode === "Day" ? "bg-blue-600" : ""}`}
              onClick={() => setViewMode("Day")}
            >
              Day
            </button>
            <button
              className={`px-2 py-1 ${
                viewMode === "Week" ? "bg-blue-600" : ""
              }`}
              onClick={() => setViewMode("Week")}
            >
              Week
            </button>
            <button
              className={`px-2 py-1 rounded-r-md ${
                viewMode === "Month" ? "bg-blue-600" : ""
              }`}
              onClick={() => setViewMode("Month")}
            >
              Month
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {viewMode === "Month" && (
            <div className="grid grid-cols-7 gap-0 rounded-l-md rounded-r-md min-w-[700px]">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm text-white py-2 bg-gray-700"
                >
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
          )}
          {viewMode === "Week" && (
            <div className="min-w-[700px]">{renderWeekView()}</div>
          )}
          {viewMode === "Day" && renderDayView()}
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-4 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="text-sm mb-2">
              {selectedEvent.date.toLocaleDateString()} at {selectedEvent.time}
            </p>
            <p className="text-sm mb-4">{selectedEvent.location}</p>
            <div className="flex flex-wrap">
              {[...Array(selectedEvent.attendees)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-700 rounded-full -ml-2 first:ml-0 mb-2"
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAllMembers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">All Team Members</h2>
              <button
                onClick={() => setShowAllMembers(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                  <span className="text-sm">Member {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <AddEvent
            onAddEvent={handleAddEvent}
            onCancel={() => setShowAddEvent(false)}
            onAdd={addEvent}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
