"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session } = useSession(); // this data will not contain user data info
  const user: User = session?.user;
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    // <nav className="p-4 md:p-4 shadow-md bg-white  text-black  ">

    <header className="sticky  mx-4 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container p-2 md:p-2  flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">FeedbackViz</span>
          </Link>
          {isHomePage && (
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 p-4">
            {session ? (
              <div className="flex justify-between items-center gap-3 sm:w-1/2 ">
                <div className="flex gap-4">
                  <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                  </Link>
                  <Button
                    className="hover:bg-red-500"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className=" flex gap-4">
                <Link href={"/sign-in"}>
                  <Button>Log-In</Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button>Sign-up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
    // </nav>
  );
}

export default Navbar;
