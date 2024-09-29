"use client";

import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

export default function HomePage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      image: "/images/logo.png",
      title: "Tech Conference 2024",
      date: "2024-09-20",
      description: "A conference about the latest in technology.",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      date: "2024-10-05",
      description: "Learn web development from scratch.",
    },
    {
      id: 3,
      title: "AI & Machine Learning Summit",
      date: "2024-11-15",
      description: "An event focusing on AI and Machine Learning.",
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 7,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 8,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 9,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 10,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 11,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
    {
      id: 12,
      title: "Startup Pitch Competition",
      date: "2024-12-01",
      description: "Compete and pitch your startup idea to investors.",
    },
  ]);

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to the Event Management Portal
        </h1>
        <p className="text-lg text-center mb-8">
          Discover and Join Exciting Events!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/eventdetails/${event.id}`}
              className="bg-white shadow-lg p-6 rounded-lg block hover:bg-gray-100"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={event.image || "/images/logo.png"}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-">
                {event.title}
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
