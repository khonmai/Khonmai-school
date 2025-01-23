"use client";
import { useSession } from "next-auth/react";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, 0);

  

  return (
    <>
      {/* {isLoading && <LoadingPage isLoading={isLoading} />}{" "} */}
      <LoadingPage />
      <div className="h-full bg-state-100 ">
        <Navbar />
        <main className="pt-40 pb-40 bg-slate-100">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MarketingLayout;
