'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRegisterMutation } from '@/features/auth/authApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password }).unwrap();
      toast.success('Registration successful');
      router.push('/login');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-20">
      {/* Image Section */}
      <div className="hidden md:block w-1/2 p-6">
        <Image
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?t=st=1742249701~exp=1742253301"
          alt="Register"
          width={500}
          height={500}
          priority={true}
          className="object-contain mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-md shadow-lg bg-white mx-4 md:mx-0">
        <h2 className="text-2xl text-center font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-[#272727] text-white hover:bg-[#1d1d1d] transition"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        {/* Optional social auth buttons (future enhancement)
        <div className="mt-4 text-center space-y-2">
          <button className="flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            <FaGoogle className="mr-2" /> Sign up with Google
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
