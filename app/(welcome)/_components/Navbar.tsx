"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import useLoginModal from "@/hooks/modals/useLoginModal";
import Link from "next/link";

export const Navbar = () => {
  const loginModal = useLoginModal();

  const handleClickLogin = () => {
    loginModal.onOpen();
  };

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"outline"} onClick={handleClickLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
