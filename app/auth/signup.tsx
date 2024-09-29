// /pages/signup.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('attendee'); // Default role to attendee
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }), // Pass the role
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      // Redirect after signup based on the role
      if (role === 'attendee') {
        router.push('/attendee-home');
      } else if (role === 'organizer') {
        router.push('/organizer/create-event');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        {/* Role Selection */}
        <div>
          <label>
            <input
              type="radio"
              value="attendee"
              checked={role === 'attendee'}
              onChange={() => setRole('attendee')}
            />
            Attendee
          </label>
          <label>
            <input
              type="radio"
              value="organizer"
              checked={role === 'organizer'}
              onChange={() => setRole('organizer')}
            />
            Organizer
          </label>
        </div>

        <button type="submit">Sign Up</button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
