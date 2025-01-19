"use client";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  return (
    <Navbar
      className="fixed top-0 bg-background/60 backdrop-blur-md"
      maxWidth="full"
    >
      {/* Brand Logo */}
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-primary" />
          <p className="font-bold text-inherit">AI Interior</p>
        </Link>
      </NavbarBrand>

      {/* Center Links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {["Design Room", "Gallery", "About"].map((item) => (
          <NavbarItem key={item}>
            <Link
              className="text-foreground-500 hover:text-primary transition-colors"
              href={`/${item.toLowerCase().replace(" ", "")}`}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side: Authentication and Actions */}
      <NavbarContent justify="end">
        <SignedIn>
          {/* User Button when signed in */}
          <NavbarItem>
            <UserButton />
          </NavbarItem>
        </SignedIn>

        <SignedOut>
          {/* Sign-in Button when signed out */}
          <NavbarItem>
            <SignInButton fallbackRedirectUrl={pathname} >
              <Button color="primary" variant="flat">
                Sign In
              </Button>
            </SignInButton>
          </NavbarItem>
        </SignedOut>

        {/* Start Designing Button */}
        <NavbarItem>
          <Button as={Link} href="/design" color="primary" variant="flat">
            Start Designing
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
