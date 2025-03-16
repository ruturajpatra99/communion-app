import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';

// Logo component
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
      <span className="text-white font-bold">C</span>
    </div>
    <span className="text-xl font-bold">Communion</span>
  </div>
);

// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-blue-500 transition-colors">Events</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Main App component
function App() {
  // Sample initial events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Interfaith Prayer Meeting",
      date: "2025-03-20",
      location: "Community Center, Downtown",
      description: "Join us for an evening of shared prayers across different faiths.",
      category: "Religious"
    },
    {
      id: 2,
      title: "Community Food Drive",
      date: "2025-03-25",
      location: "Main Park",
      description: "Help collect food donations for local shelters.",
      category: "Charity"
    },
    {
      id: 3,
      title: "Cultural Diversity Festival",
      date: "2025-04-05",
      location: "City Hall Plaza",
      description: "Celebrating our diverse community with music, food, and art.",
      category: "Social"
    }
  ]);

  // Function to add a new event
  const addEvent = (newEvent) => {
    // Add a unique ID and add to events array
    const eventWithId = {
      ...newEvent,
      id: events.length + 1
    };
    setEvents([...events, eventWithId]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/events" 
              element={<EventsPage events={events} addEvent={addEvent} />} 
            />
          </Routes>
        </div>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>&copy; 2025 Communion App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;