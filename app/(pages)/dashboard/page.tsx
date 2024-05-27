"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";

function DashboardPage() {
  const router = useRouter();

  const { data: session } = useSession();

  const handleLotout = () => {
    signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <div className="w-full px-2 m-auto ">
      <div className="flex items-center justify-between pb-4">
        <Heading title={`Dashboard`} description="Dashboard" />
      </div>
    </div>
  );
}

export default DashboardPage;
