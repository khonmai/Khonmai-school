"use client"
import { useSession } from "next-auth/react";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { useRouter } from "next/navigation";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if (status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <div className="h-full bg-state-100 ">
      <Navbar />
      <main className="pt-40 pb-40 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
