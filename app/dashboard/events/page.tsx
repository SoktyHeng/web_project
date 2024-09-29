"use client";

import Footer from "@/components/shared/Footer";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { PlusIcon } from "lucide-react";

export default function EventList() {
  interface Event {
    _id: string;
    eventTitle: string;
    date: string;
    description: string;
    image?: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE}/event`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Sidebar />
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Events</h1>
          <Link href="/dashboard/events/createevent">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map((event) => (
            <Link
              key={event._id} // Use _id from MongoDB
              href={`/dashboard/eventdetails/${event._id}`}
              className="bg-white shadow-lg p-6 rounded-lg block hover:bg-gray-100"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={event.image || "/images/logo.png"}
                  alt={event.eventTitle}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {event.eventTitle} {/* Adjust based on your model */}
              </h2>
              <p className="text-gray-500 mb-4">Date: {event.date}</p>
              <p className="text-gray-700 mb-4 truncate">{event.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
