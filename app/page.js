"use client";
import Image from "next/image";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  useEffect(() => {
    user && createUserProfile();
  }, [user]);

  // User Profile
  const createUserProfile = () => {
    if (!localStorage.getItem("isLogin")) {
      const data = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl,
      };
      GlobalApi.createUser(data).then((response) => {
        console.log(response.data);
        localStorage.setItem("isLogin", true);
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <UserButton />
      <h1 className="text-2xl text-blue-600 tracking-wider font-bold">
        The Application is Still Under Process!!!
      </h1>
      <Link href={"/home"}>
        <Button>Go To Home Page!</Button>
      </Link>
    </div>
  );
}
