"use client";

import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, MessageSquare, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Add these action handlers
  const handleStartTherapy = () => {
    router.push("/therapy/new");
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-20 pb-8 space-y-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-plus-jakarta tracking-tight">
              <span className="inline-block bg-gradient-to-r from-[#8BD3E6] to-[#5bafc7] bg-clip-text text-transparent">
                Welcome Back!
              </span>
            </h1>
            <p className="text-[#5bafc7]">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5 text-[#5bafc7]" />
            </Button>
          </div>
        </div>
        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quick Actions Card */}
            <Card className="border-[#5bafc7] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d1f5ff] to-transparent dark:from-[#43656e] to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#5bafc7]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#44889b] dark:text-[#d1f5ff] text-lg">Quick Actions</h3>
                      <p className="text-sm text-[#5bafc7]">
                        Start your wellness journey
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                     <Button
  className={cn(
    "w-full justify-between items-center p-6 h-auto group/button",
    // Custom theme
    "bg-gradient-to-r from-[#8BD3E6] to-[#5bafc7] hover:from-[#5bafc7] hover:to-[#8BD3E6]",
    "rounded-xl shadow-md transition-all duration-200 group-hover:translate-y-[-2px]"
  )}
  onClick={handleStartTherapy}
>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
      <MessageSquare className="w-4 h-4 text-white" />
    </div>
    <div className="text-left">
      <div className="font-semibold text-white dark:text-[#3e7a8b]">
        Start Therapy
      </div>
      <div className="text-xs text-white/80 dark:text-[#3e7a8b]">
        Begin a new session
      </div>
    </div>
  </div>
  <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
    <ArrowRight className="w-5 h-5 text-white" />
  </div>
</Button>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
