// /pages/login.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: selectedRole, // make sure this is defined
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error:', errorData);
      // Handle the error (e.g., display a message)
    } else {
      const data = await response.json();
      console.log('Login success:', data);
      // Handle successful login
    }
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Login</button>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
