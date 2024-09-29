"use client";

import { useState } from "react";
import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "October 26, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Tech Conference Center, San Francisco, CA",
    description:
      "Join us for the latest insights and innovations in technology at Tech Conference 2024. Network with leading experts, attend workshops, and discover the future of technology.",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    date: "November 5, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Online",
    description:
      "Learn web development from scratch in this intensive bootcamp. Gain hands-on experience with popular web technologies.",
  },
  {
    id: 3,
    title: "AI & Machine Learning Summit",
    date: "November 15, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "AI Conference Hall, Boston, MA",
    description:
      "Dive into the world of artificial intelligence and machine learning with industry experts.",
  },
];

const EventDetailsModal = ({ event, onClose }: { event: any; onClose: () => void }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <XIcon className="w-6 h-6 text-gray-500" />
        </button>

        {/* Event Details */}
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
        <p className="mt-2 text-gray-500">
          {event.date} | {event.time}
        </p>
        <p className="mt-2 text-gray-500">{event.location}</p>
        <p className="mt-4 text-gray-700">{event.description}</p>

        {/* Close Button */}
        <Button
          className="mt-6 bg-blue-600 text-white hover:bg-blue-500 w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

const RegisteredEvents = () => {
  const [registeredEvents] = useState([1, 2]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const userRegisteredEvents = events.filter((event) =>
    registeredEvents.includes(event.id)
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Registered Events</h1>

        <div className="space-y-4">
          {userRegisteredEvents.length > 0 ? (
            userRegisteredEvents.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-500">
                  {event.date} | {event.time}
                </p>
                <p className="text-gray-500">{event.location}</p>
                <Button
                  className="mt-4 bg-blue-600 text-white hover:bg-blue-500"
                  onClick={() => setSelectedEvent(event)}
                >
                  View Details
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              You haven't registered for any events yet.
            </p>
          )}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default RegisteredEvents;
