"use client";
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";

export default function TopBar() {
  return (
    <Navbar 
      className="fixed top-0 bg-background/60 backdrop-blur-md"
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-primary" />
          <p className="font-bold text-inherit">AI Interior</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {['Design Room', 'Gallery', 'About'].map((item) => (
          <NavbarItem key={item}>
            <Link 
              className="text-foreground-500 hover:text-primary transition-colors"
              href={`/${item.toLowerCase().replace(' ', '')}`}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button 
            as={Link}
            href="/design"
            color="primary"
            variant="flat"
          >
            Start Designing
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
} 