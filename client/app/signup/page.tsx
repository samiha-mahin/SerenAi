"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Mail, User, Lock } from "lucide-react";
import { registerUser } from "@/lib/api/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(name, email, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
      <Container className="flex flex-col items-center justify-center w-full">
        <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border bg-card/90 backdrop-blur-lg mt-20">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
              Sign Up
            </h1>
            <p className="font-medium text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
              Create your account to start your journey with Aura.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300"
                >
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-base text-center font-medium">
                {error}
              </p>
            )}
            <Button
              className="w-full py-2 text-base rounded-xl font-bold bg-gradient-to-r from-[#5bafc7] to-[#8BD3E6] shadow-md hover:from-[#8BD3E6] hover:to-[#5bafc7]"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="my-6 border-t border-[#5bafc7]" />
          <p className="text-base text-center text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold underline text-blue-500 transition-colors duration-300"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
}
