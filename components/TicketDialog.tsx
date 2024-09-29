"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon, MinusIcon, PlusIcon } from "lucide-react";

export const TicketPurchaseModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [ticketCount, setTicketCount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleIncreaseTicket = () => setTicketCount(ticketCount + 1);
  const handleDecreaseTicket = () => {
    if (ticketCount > 0) setTicketCount(ticketCount - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <XIcon className="w-6 h-6 text-gray-500" />
        </button>

        {/* Event Information */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            Learn how to collect maximum royalties
          </h2>
          <p className="text-gray-500 mt-2">
            Friday, September 20 - 7am to 8am +07
          </p>
        </div>

        {/* Ticket Selection */}
        <div className="mb-6 border border-gray-300 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">General Admission</h3>
              <p className="text-sm text-gray-500">
                $20.00 - Sales end on Sep 18, 2024
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This ticket allows you entrance into our private meeting room
                with Keith Kirk.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecreaseTicket}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <MinusIcon />
              </button>
              <span>{ticketCount}</span>
              <button
                onClick={handleIncreaseTicket}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Enter Card Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full mt-1"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full mt-1"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-between items-center">
          <Button className="bg-[#2b5e9f] text-white px-6 py-2 rounded-lg">
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
};

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Purchase Button */}
      <Button
        className="w-full bg-blue-600 text-white hover:bg-blue-500"
        onClick={openModal}
      >
        Buy Tickets
      </Button>

      {/* Modal Dialog */}
      <TicketPurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default EventDetail;