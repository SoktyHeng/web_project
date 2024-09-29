'use client'; // Ensure this is at the top

import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PencilIcon, ArrowLeftIcon } from 'lucide-react';

interface User {
  profilePicture?: string;
  name: string;
  email: string;
  bio: string;
  id_: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);

  useEffect(() => {
    const fetchUser = async () => {
      const organizerId = '66f842a7516c67a34056bbc9'; // Replace this with the actual organizer ID from the route or state

      try {
        const response = await fetch(`${API_BASE}/organizer/${organizerId}`);
        if (!response.ok) {
          throw new Error('Organizer ID not found.');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      }
    };

    fetchUser();
  }, []);

  const handleEditProfile = () => {
    router.push('/profile/edit-profile'); // Navigate to the Edit Profile page
  };

  const handleBack = () => {
    router.push('/dashboard/events'); // Go back to events dashboard
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md relative">
          <div className="absolute top-4 left-4">
            <button onClick={handleBack} aria-label="Back">
              <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <button onClick={handleEditProfile} aria-label="Edit Profile">
              <PencilIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={user.profilePicture || '/default-profile-picture.jpg'} // Use a default image if none
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <p className="text-gray-800 text-center">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 