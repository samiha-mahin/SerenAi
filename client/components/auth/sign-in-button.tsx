"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button
      asChild
      className={`bg-[#8BD3E6] hover:bg-[#5bafc7] text-white hover:text-white ${className} dark:text-black`}
    >
      <Link href="/login">Sign In</Link>
    </Button>
  );
}
