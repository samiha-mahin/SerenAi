"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30">
      <Container className="flex flex-col items-center justify-center w-full">
        <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-12">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-1 tracking-tight text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
              Sign In
            </h1>
            <p className="text-base font-medium text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
              Welcome back! Please sign in to continue your journey.
            </p>
          </div>
          <form className="space-y-6 border-[#5bafc7]" onSubmit={handleSubmit}>
            <div className="space-y-3 ">
              <div>
                <label htmlFor="email" className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7] placeholder:hover:text-[#8BD3E6]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-base font-semibold mb-1 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-12 py-2 text-black dark:text-white text-base rounded-xl bg-card bg-opacity-80 border border-[#5bafc7] focus:outline-none focus:ring-2 focus:ring-[#5bafc7] placeholder:text-[#5bafc7] placeholder:hover:text-[#8BD3E6]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <Button
              className="w-full py-2 text-base rounded-xl font-bold bg-gradient-to-r from-[#5bafc7] to-[#8BD3E6] shadow-md hover:from-[#8BD3E6] hover:to-[#5bafc7]"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="my-6 border-t border-[#5bafc7]" />
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">
                Don&apos;t have an account?
              </span>
              <Link
                href="/signup"
                className="text-[#5bafc7] font-semibold underline hover:text-[#8BD3E6] transition-colors duration-300"
              >
                Sign up
              </Link>
              <span className="text-[#5bafc7] hover:text-[#8BD3E6] transition-colors duration-300">·</span>
              <Link
                href="/forgot-password"
                className="text-[#5bafc7] underline hover:text-[#8BD3E6] transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
