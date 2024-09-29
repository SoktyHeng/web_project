"use client";
import React from "react";
import Link from "next/Link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const user = null; // Placeholder for user authentication logic

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo Section */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img
          src="/images/logo.png"
          alt="Event Logo"
          className="h-12 w-12 mr-3"
        />
        <h1 className="text-2xl font-bold">PlanIT</h1>
      </div>
      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Button
          variant="ghost"
          className="text-black"
          onClick={() => router.push("/")}
        >
          Home
        </Button>
       
        <Button
          variant="ghost"
          className="text-black"
          onClick={() => router.push("/about")}
        >
          About Us
        </Button>
        <Button
          variant="ghost"
          className="text-black"
          onClick={() => router.push("/contact")}
        >
          Contact
        </Button>
        <Button
          variant="ghost"
          className="text-black"
          onClick={() => router.push("/profile1")}
        >
          Profile
        </Button>
      </nav>

      {/* Profile, Login/Signup Buttons */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/profile">
              <span className="text-lg">Profile</span>
            </Link>
            <Button onClick={() => console.log("Logout")}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button className="bg-[#2b5e9f]">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
