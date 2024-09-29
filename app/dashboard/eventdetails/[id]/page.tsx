"use client";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  PencilIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Review from "@/components/Review";

const EventDetail = () => {
  interface Event {
    _id: string;
    eventTitle: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    price: string;
    capacity: string;
  }
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Get the event ID from the query parameters

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`${API_BASE}/event/${id}`); // Fetch the event by ID
          const data = await response.json();
          if (response.ok) {
            setEvent(data); // Update the state with the fetched event
          } else {
            console.error("Event not found:", data.message);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };

      fetchEvent();
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>; // Show a loading state while fetching the event
  }

  const handleEdit = () => {
    router.push(`/dashboard/events/editevent/${event._id}`); // Use _id instead of id
  };

  const handleBack = () => {
    router.push("/dashboard/events");
  };

  return (
    <div>
      <Sidebar />
      {/* Event Details */}
      <div className="max-w-4xl mx-auto p-8 mt-16 space-y-6 bg-white shadow-lg rounded-lg relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <PencilIcon className="w-6 h-6" />
        </button>

        {/* Event Title */}
        <h1 className="text-4xl font-bold text-gray-900">{event.eventTitle}</h1>

        {/* Date, Time, and Location */}
        <div className="flex space-x-8 mt-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="text-gray-500" />
            <span className="text-lg text-gray-700">{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="text-gray-500" />
            <span className="text-lg text-gray-700">
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="text-gray-500" />
            <span className="text-lg text-gray-700">{event.location}</span>
          </div>
        </div>

        {/* Event Description */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Event Description
          </h2>
          <p className="text-lg text-gray-600 mt-2">{event.description}</p>
        </div>

        {/* Ticket Info */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Ticket Information
          </h2>
          <div className="flex space-x-8 mt-4">
            <div className="flex items-center space-x-2">
              <TicketIcon className="text-gray-500" />
                <span className="text-lg text-gray-700">
                Price: ${event.price}
                </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-700">
                Capacity: {event.capacity}
              </span>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
