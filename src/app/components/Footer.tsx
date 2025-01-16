"use client";
import { Link } from "@nextui-org/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-background/60 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="flex items-center gap-2 text-default-500">
            Made with <HeartIcon className="w-4 h-4 text-danger animate-pulse" /> by
            <Link
              href="https://www.linkedin.com/in/mohd-kaif-01/"
              className="font-medium hover:text-primary transition-colors"
              target="_blank"
            >
              Kaif
            </Link>
          </p>
          <p className="text-default-400 text-sm">
            © {currentYear} AI Interior Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 