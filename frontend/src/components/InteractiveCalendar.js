import React, { useState } from 'react';

const InteractiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventInput, setEventInput] = useState('');
  const [selectedDateForEvent, setSelectedDateForEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get month name
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Check if date is today
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  // Check if date is selected
  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           currentMonth === selectedDate.getMonth() && 
           currentYear === selectedDate.getFullYear();
  };

  // Check if date has events
  const hasEvents = (day) => {
    if (!day) return false;
    const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
    return events[dateKey] && events[dateKey].length > 0;
  };

  // Handle date selection
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setSelectedDateForEvent(new Date(currentYear, currentMonth, day));
      setShowEventModal(true);
    }
  };

  // Add event
  const handleAddEvent = () => {
    if (eventInput.trim() && selectedDateForEvent) {
      const dateKey = `${selectedDateForEvent.getFullYear()}-${selectedDateForEvent.getMonth() + 1}-${selectedDateForEvent.getDate()}`;
      const newEvent = {
        id: Date.now(),
        text: eventInput.trim(),
        date: selectedDateForEvent
      };

      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent]
      }));

      setEventInput('');
      setShowEventModal(false);
      setSelectedDateForEvent(null);
      setIsEditMode(false);
      setEditingEvent(null);
    }
  };

  // Edit event
  const handleEditEvent = () => {
    if (eventInput.trim() && editingEvent) {
      const dateKey = `${selectedDateForEvent.getFullYear()}-${selectedDateForEvent.getMonth() + 1}-${selectedDateForEvent.getDate()}`;
      
      setEvents(prev => ({
        ...prev,
        [dateKey]: prev[dateKey].map(event => 
          event.id === editingEvent.id 
            ? { ...event, text: eventInput.trim() }
            : event
        )
      }));

      setEventInput('');
      setShowEventModal(false);
      setSelectedDateForEvent(null);
      setIsEditMode(false);
      setEditingEvent(null);
    }
  };

  // Start editing event
  const startEditEvent = (event) => {
    setEditingEvent(event);
    setEventInput(event.text);
    setIsEditMode(true);
    setShowEventModal(true);
  };

  // Delete event
  const handleDeleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(event => event.id !== eventId)
    }));
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    return events[dateKey] || [];
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
      {/* Header with navigation */}
      <div className="flex items-center justify-between w-full mb-3">
        <button
          onClick={goToPreviousMonth}
          className="text-btggreen hover:text-btgorange transition-colors"
          title="Previous month"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <span className="font-bold text-base md:text-lg text-btggreen">
          {getMonthName(currentMonth)} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="text-btggreen hover:text-btgorange transition-colors"
          title="Next month"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 w-full text-center text-[11px] md:text-xs mb-2">
        <span className="text-gray-600">Sun</span>
        <span className="text-gray-600">Mon</span>
        <span className="text-gray-600">Tue</span>
        <span className="text-gray-600">Wed</span>
        <span className="text-gray-600">Thu</span>
        <span className="text-gray-600">Fri</span>
        <span className="text-gray-600">Sat</span>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 w-full text-center text-[11px] md:text-xs">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={!day}
            className={`py-1 rounded-full transition-all duration-200 ${
              !day 
                ? 'invisible' 
                : isToday(day)
                ? 'bg-btgyellow text-btggreen font-bold'
                : isSelected(day)
                ? 'bg-btggreen text-white font-bold'
                : hasEvents(day)
                ? 'bg-btgorange/20 text-btgorange hover:bg-btgorange/30'
                : 'hover:bg-gray-100 text-gray-700'
            } ${day ? 'cursor-pointer' : ''}`}
            title={day ? `Click to add event for ${day}` : ''}
          >
            <div className="relative">
              {day}
              {hasEvents(day) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-btgorange rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Selected date events */}
      {selectedDate && getEventsForSelectedDate().length > 0 && (
        <div className="w-full mt-3 p-2 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">
            Events for {selectedDate.toLocaleDateString()}
          </div>
                     {getEventsForSelectedDate().map((event) => (
             <div key={event.id} className="flex items-center justify-between text-xs bg-white p-1 rounded mb-1">
               <span className="text-gray-700">{event.text}</span>
               <div className="flex gap-1">
                 <button
                   onClick={() => startEditEvent(event)}
                   className="text-btggreen hover:text-btgyellow"
                   title="Edit event"
                 >
                   <span className="material-symbols-outlined text-xs">edit</span>
                 </button>
                 <button
                   onClick={() => handleDeleteEvent(
                     `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
                     event.id
                   )}
                   className="text-red-500 hover:text-red-700"
                   title="Delete event"
                 >
                   <span className="material-symbols-outlined text-xs">delete</span>
                 </button>
               </div>
             </div>
           ))}
        </div>
      )}

             {/* Event Modal */}
       {showEventModal && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg p-4 w-80 max-w-sm">
             <h3 className="font-bold text-lg mb-3 text-gray-900">
               {isEditMode ? 'Edit Event' : `Add Event for ${selectedDateForEvent?.toLocaleDateString()}`}
             </h3>
             <input
               type="text"
               value={eventInput}
               onChange={(e) => setEventInput(e.target.value)}
               placeholder="Enter event description..."
               className="w-full rounded-lg border border-btggreen px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow mb-3"
               onKeyDown={(e) => {
                 if (e.key === 'Enter') isEditMode ? handleEditEvent() : handleAddEvent();
                 if (e.key === 'Escape') {
                   setShowEventModal(false);
                   setIsEditMode(false);
                   setEditingEvent(null);
                 }
               }}
               autoFocus
             />
             <div className="flex gap-2">
               <button
                 onClick={isEditMode ? handleEditEvent : handleAddEvent}
                 className="flex-1 bg-btggreen text-white rounded-lg px-3 py-2 text-sm hover:bg-btgyellow hover:text-btggreen transition-colors"
               >
                 {isEditMode ? 'Update Event' : 'Add Event'}
               </button>
               <button
                 onClick={() => {
                   setShowEventModal(false);
                   setIsEditMode(false);
                   setEditingEvent(null);
                 }}
                 className="flex-1 bg-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm hover:bg-gray-400 transition-colors"
               >
                 Cancel
               </button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default InteractiveCalendar; 