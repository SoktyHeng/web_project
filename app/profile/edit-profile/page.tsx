"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";

const EditProfile = () => {
  const router = useRouter();

  const [organizerData, setOrganizerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [organizerId, setOrganizerId] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);

  useEffect(() => {
    const fetchOrganizerId = async () => {
      try {
        const response = await fetch(`${API_BASE}/organizer/66f842a7516c67a34056bbc9`);
        if (response.ok) {
          const data = await response.json();
          setOrganizerData(data);
          setOriginalData(data); // Store original data for reset
          setOrganizerId(data._id);
        } else {
          console.error("Failed to fetch organizer data");
        }
      } catch (error) {
        console.error("Error fetching organizer data:", error);
      }
    };

    fetchOrganizerId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganizerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${API_BASE}/organizer/${organizerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organizerData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        router.push("/profile");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile"); // Reset to original data
  };

  

  return (
    <div>
      <Sidebar />
      <div className="max-w-4xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg mt-2">
        <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>

        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={organizerData.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={organizerData.email}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSaveChanges} className="bg-[#2b5e9f] text-white">
            Save Changes
          </Button>
          <Button onClick={handleCancel} className="bg-gray-300 text-black ml-2">
            Cancel
          </Button>
        </div>

        
      </div>
    </div>
  );
};

export default EditProfile;
