"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/features/auth/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password }).unwrap();
      toast.success("Registration successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 md:px-8 lg:px-16 py-12 bg-background text-foreground">
      {/* Image Section */}
      <div className="hidden lg:flex w-1/2 justify-center items-center">
        <Image
          src="/auth.png"
          alt="Register Illustration"
          width={600}
          height={600}
          priority
          className="object-contain rounded-xl"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-xl border border-gray-300 shadow-md rounded-xl p-8 bg-background text-foreground">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-base mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-base mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="h-12 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#2C2A4A] text-base text-white rounded-md hover:bg-[#1d1d1d] transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Optional footer or switch link */}
        <p className="text-center mt-6 text-sm ">
          Already have an account?{" "}
          <span className="font-medium underline cursor-pointer" onClick={()=>router.push("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
