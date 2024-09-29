'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SignIn = () => {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
  
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // No need for role here
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store organizer ID in local storage
        localStorage.setItem('organizerId', data.organizerId); // Assuming the ID is returned in this field
        console.log("Login successful:", data);
        
        // Redirect based on role
        if (data.role === 'organizer') {
          window.location.href = '/dashboard/events'; // Redirect to events dashboard
        } else if (data.role === 'attendee') {
          window.location.href = '/'; // Redirect to homepage
        }
      } else {
        setError(data.error || "Failed to sign in");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to sign in");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex w-full max-w-4xl bg-white rounded shadow-md">
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="/images/logo.png"
            alt="Sign In"
            layout="fill"
            objectFit="cover"
            className="rounded-l"
          />
        </div>
        <div className="w-full h-full md:w-1/2 p-6 space-y-8">
          <h1 className="text-2xl font-bold text-center text-[#2b5e9f] pt-6">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 pt-10">
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

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#2b5e9f] hover:bg-[#1565C0] text-white"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
