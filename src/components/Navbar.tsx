"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession(); // this data will not contain user data info
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-4 shadow-md bg-white  text-black  ">
      <div className="container mx-auto flex flex-col md:flex-row sm:gap-0 gap-4 justify-between items-center">
        <Link href="/" className="text-3xl font-semibold ">
          Mstry Message
        </Link>
        {session ? (
          <div className="flex justify-between items-center gap-3 sm:w-1/2 ">
            <span className="text-center">Welcome,
              <b> {user?.username  || user?.email}
                </b></span>
            <div className="flex gap-4">
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <Button className="hover:bg-red-500" onClick={() => signOut()}>Logout</Button>
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
      </div>
    </nav>
  );
}

export default Navbar;
