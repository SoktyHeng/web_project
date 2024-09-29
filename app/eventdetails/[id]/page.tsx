"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TicketDialog, { TicketPurchaseModal } from '@/components/TicketDialog';
import Review from '@/components/Review'; // Import the Review component
import Navbar from '@/components/shared/NavBar';

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const event = {
    id: "1",
    title: "Tech Conference 2024",
    date: "October 26, 2024",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "Tech Conference Center, San Francisco, CA",
    description:
      "Join us for the latest insights and innovations in technology at Tech Conference 2024. Network with leading experts, attend workshops, and discover the future of technology.",
    price: "$100",
    capacity: "500",
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      {/* Event Details */}
      <div className="max-w-4xl mx-auto p-8 mt-16 space-y-6 bg-white shadow-lg rounded-lg relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        {/* Event Title */}
        <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>

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
                Price: {event.price}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg text-gray-700">
                Capacity: {event.capacity}
              </span>
            </div>
          </div>
        </div>

        {/* Purchase Ticket Button */}
        <div className="mt-8">
          <Button onClick={openModal} className="bg-[#2b5e9f] text-white hover:bg-[#1e4a7a]">
            Purchase Ticket
          </Button>
        </div>

        {/* Modal Dialog */}
        {isModalOpen && <TicketPurchaseModal isOpen={isModalOpen} onClose={closeModal} />}

        {/* Review Section */}
        <div className="mt-8">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;