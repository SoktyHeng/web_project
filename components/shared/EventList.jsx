"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Assume data is an array of events
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {events.map((event) => (
            <div key={event._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
              <div>
                <h2 className="font-bold text-2xl">{event.eventTitle}</h2>
                <div>{event.description}</div>
              </div>
              <div className="flex gap-2">
                <RemoveBtn id={event._id} setEvents={setEvents} />
                <Link href={`/editEvent/${event._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
