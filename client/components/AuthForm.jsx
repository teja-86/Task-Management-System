'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../utils/api';

export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = type === 'login' ? `${process.env.NEXT_PUBLIC_API_URL}/auth/login` : `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
      const payload = type === 'login' 
        ? { email, password } 
        : { email, password, username }; // Include username for registration
      const res = await axios.post(url, payload);      
      alert(res.data.message);
      if (type === 'login') {
        router.push('/dashboard');
      } else {
        router.push('/login'); 
      }
      setEmail('');
      setPassword('');
      setUsername(''); // Reset username
    } catch (err) {
      alert(err?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">{type === 'login' ? 'Login' : 'Register'}</h2>
        {type === 'register' && (
          <input
            type="text"
            placeholder="Username"
            className="mb-4 p-2 w-full border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 w-full border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
        
        {/* Move the "quick navigation" text below the button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push(type === 'login' ? '/register' : '/login')}
            className="text-blue-500 hover:underline"
          >
            {type === 'login' ? 'Don’t have an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
