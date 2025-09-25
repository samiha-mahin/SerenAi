import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6">
      <div className="container flex flex-col items-center gap-4 px-4 md:px-6">
        <p className="text-sm text-[#5bafc7] text-center">
          © 2025 Aura 3.0 All rights reserved.
        </p>
      </div>
    </footer>
  );
}