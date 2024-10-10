import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Calendar = ({ isOpen, onClose, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      calendarDays.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-10 w-10 rounded-full flex items-center justify-center
            ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
        >
          {day}
        </button>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleApply = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth}>
            <ChevronLeft />
          </button>
          <h2 className="text-lg font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={handleNextMonth}>
            <ChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
          {generateCalendarDays()}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
