'use client'; 

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Register = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
  const [role, setRole] = useState("attendee"); // Default role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("role", role);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        const response = await fetch(`${API_BASE}/signup`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Registration successful:", data);
            // Redirect to the homepage after successful registration
            window.location.href = "/"; // Adjust the path as necessary
        } else {
            setError(data.error);
        }
    } catch (err) {
        setError("Failed to register");
    }
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePicture(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded shadow-md">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="/images/logo.png" // Correct path
            alt="Register"
            layout="fill"
            objectFit="cover"
            className="rounded-l"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
          <h1 className="text-2xl font-bold text-center text-[#2b5e9f]">
            Register
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-gray-700">Role</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="attendee"
                    checked={role === "attendee"}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Attendee
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    value="organizer"
                    checked={role === "organizer"}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Organizer
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <label htmlFor="profilePicture" className="block text-gray-700">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {profilePicturePreview && (
                <div className="mt-4">
                  <Image
                    src={profilePicturePreview}
                    alt="Profile Picture Preview"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#2b5e9f] text-white hover:bg-blue-700"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
