"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.accessToken }));

      toast.success("Login Successful", { duration: 3000 });

      if (res.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed", { duration: 3000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-20">
      {/* Image Section */}
      <div className="hidden md:block w-1/2 p-6">
        <Image
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg?t=st=1742249701~exp=1742253301~hmac=73086946b36398a716b6d88015fb49bf79624d57269d8ddc2a772ee3c1c5cdf6&w=1380"
          alt="Login Illustration"
          width={500}
          height={500}
          priority
          className="object-contain mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-md shadow-lg bg-white mx-4 md:mx-0">
        <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-[#272727] text-white rounded-md hover:bg-[#1d1d1d] transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          Don't have an account? <span className="text-black underline cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}
