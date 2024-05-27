"use client";

import { useRouter } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { useSession } from "next-auth/react";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="h-full flex">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto pt-1 ">{children}</main>
    </div>
  );
};

export default PagesLayout;
