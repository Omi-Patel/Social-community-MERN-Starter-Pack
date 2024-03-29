import Link from "next/link";
import React from "react";
import { Button } from "../../../components/ui/button";

const Community = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <h1 className="text-2xl font-bold tracking-widest text-blue-700">
        Launching Soon! |{" "}
      </h1>
      <h2 className="text-xl tracking-wide font-medium text-gray-500">
        Stay Connected To Get Notifications..!
      </h2>
      <Link href={"/home"}>
        <Button>Go To Home Page!</Button>
      </Link>
    </div>
  );
};

export default Community;
