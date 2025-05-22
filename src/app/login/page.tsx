"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

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
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed", { duration: 3000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 md:px-8 lg:px-16 py-12 bg-background text-foreground">
      {/* Image Section */}
      <div className="hidden lg:flex w-1/2 justify-center items-center">
        <Image
          src="/auth.png"
          alt="Login Illustration"
          width={600}
          height={600}
          priority
          className="object-contain border-gray-300 rounded-xl"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-xl border border-gray-300 shadow-md rounded-xl p-8 bg-background text-foreground">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-base mb-1">Email</label>
            <Input
              type="email"
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
              className="h-12 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#2A2A2A] text-base text-white rounded-md hover:bg-[#1d1d1d] transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <span className="font-medium underline cursor-pointer" onClick={()=>router.push("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
