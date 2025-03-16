import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Filter } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex flex-col h-full transform hover:scale-[1.02]">
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
          ${event.category === 'Religious' ? 'bg-blue-100 text-blue-700' : 
            event.category === 'Charity' ? 'bg-green-100 text-green-700' : 
            'bg-purple-100 text-purple-700'}`}>
          {event.category}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <div className="mb-4 text-gray-500 flex items-center gap-2">
        <Calendar size={16} />
        <span>{new Date(event.date).toLocaleDateString('en-US', { 
          year: 'numeric', month: 'long', day: 'numeric' 
        })}</span>
      </div>
      <div className="mb-4 text-gray-500 flex items-center gap-2">
        <MapPin size={16} />
        <span>{event.location}</span>
      </div>
      <p className="text-gray-600 flex-grow">{event.description}</p>
      {/* <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        View Details
      </button> */}
    </div>
  );
};

const AddEventForm = ({ onAddEvent, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Social'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="Religious">Religious</option>
              <option value="Social">Social</option>
              <option value="Charity">Charity</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EventsPage = ({ events, addEvent }) => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-gray-600">Discover and join events in your community</p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              <span>Filter: {filter}</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li 
                    onClick={() => { setFilter('All'); setIsFilterOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </li>
                  <li 
                    onClick={() => { setFilter('Religious'); setIsFilterOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Religious
                  </li>
                  <li 
                    onClick={() => { setFilter('Social'); setIsFilterOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Social
                  </li>
                  <li 
                    onClick={() => { setFilter('Charity'); setIsFilterOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Charity
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found. Try a different filter or add a new event.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {showForm && (
        <AddEventForm 
          onAddEvent={addEvent} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </div>
  );
};

export default EventsPage;