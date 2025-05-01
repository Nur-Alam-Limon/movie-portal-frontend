'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRegisterMutation } from '@/features/auth/authApi';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      await register({ email, password }).unwrap();
      router.push('/login');
    } catch (err: any) {
      alert(err?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </div>
  );
}
