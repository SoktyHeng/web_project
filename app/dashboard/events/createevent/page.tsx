"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";


interface CreateEventProps {}

const CreateEvent = ({}: CreateEventProps) => { 
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [eventTitle, setEventTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0.00");
  const [capacity, setCapacity] = useState("0");
  const [isFree, setIsFree] = useState(false);
  const [eventType, setEventType] = useState("Venue");

  const handleToggleFree = () => setIsFree(!isFree);
  const handleBack = () => router.push("/dashboard/events");

  const handleCreateEvent = async () => {
    const event = {
      eventTitle,
      date,
      startTime,
      endTime,
      location,
      price: isFree ? "0.00" : price,
      capacity,
      isFree,
      eventType,
      image: "/images/logo.png",
    };

    try {
      const response = await fetch(`${API_BASE}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event created:", data);
        router.push("/dashboard/events");
      } else {
        console.error("Failed to create event:", response.status);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  return (
    <div>
      <Sidebar />
      <div className="max-w-4xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg mt-2">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800">Create an Event</h1>
        <p className="text-gray-600">
          Answer a few questions about your event and our AI creation tool will
          use internal data to build an event page.
        </p>

        {/* Event Title */}
        <div className="space-y-2">
          <label
            htmlFor="eventTitle"
            className="block text-lg font-semibold text-gray-700"
          >
            What’s the name of your event?
          </label>
          <p className="text-sm text-gray-500">
            This will be your event’s title. Your title will be used to help
            create your event’s summary, description, category, and tags – so be
            specific!
          </p>
          <Input
            id="eventTitle"
            placeholder="Event title *"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-lg font-semibold text-gray-700"
            >
              Date
            </label>
            <div className="relative">
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
              <CalendarIcon className="absolute right-2 top-2 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="startTime"
              className="block text-lg font-semibold text-gray-700"
            >
              Start time
            </label>
            <div className="relative">
              <Input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full"
              />
              <ClockIcon className="absolute right-2 top-2 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="endTime"
              className="block text-lg font-semibold text-gray-700"
            >
              End time
            </label>
            <div className="relative">
              <Input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full"
              />
              <ClockIcon className="absolute right-2 top-2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Where is it located?
          </label>
          <div className="flex space-x-4">
            <Button
              onClick={() => setEventType("Venue")}
              className={
                eventType === "Venue"
                  ? "bg-[#2b5e9f] text-white hover:bg-[#1e4a7a]"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            >
              Venue
            </Button>
            <Button
              onClick={() => setEventType("Online")}
              className={
                eventType === "Online"
                  ? "bg-[#2b5e9f] text-white hover:bg-[#1e4a7a]"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            >
              Online Event
            </Button>
            <Button
              onClick={() => setEventType("TBA")}
              className={
                eventType === "TBA"
                  ? "bg-[#2b5e9f] text-white hover:bg-[#1e4a7a]"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            >
              To be announced
            </Button>
          </div>

          {eventType === "Venue" && (
            <div className="relative mt-4">
              <Input
                placeholder="Location *"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
              />
              <MapPinIcon className="absolute right-2 top-2 text-gray-500" />
            </div>
          )}
        </div>

        {/* Ticket Price */}
        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700"
          >
            How much do you want to charge for tickets?
          </label>
          <p className="text-sm text-gray-500">
            Our tool can only generate one General Admission ticket for now. You
            can edit and add more ticket types later.
          </p>
          <div className="relative">
            <Input
              id="price"
              type="number"
              min="0"
              value={isFree ? "0.00" : price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isFree}
              className="w-full"
            />
            <Button
              variant="outline"
              onClick={handleToggleFree}
              className="mt-2 text-sm"
            >
              {isFree ? "Tickets are free" : "My tickets are free"}
            </Button>
          </div>
        </div>

        {/* Capacity */}
        <div className="space-y-2">
          <label
            htmlFor="capacity"
            className="block text-lg font-semibold text-gray-700"
          >
            What's the capacity for your event?
          </label>
          <p className="text-sm text-gray-500">
            Event capacity is the total number of tickets you’re willing to
            sell.
          </p>
          <Input
            id="capacity"
            type="number"
            min="0"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Create Event Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleCreateEvent}
            className="bg-[#2b5e9f] text-white"
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
