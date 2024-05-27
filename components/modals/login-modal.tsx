"use client";

import useLoginModal from "@/hooks/modals/useLoginModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SignInPage from "@/app/_components/sign-in";

export const LoginModal = () => {
  const loginModal = useLoginModal();

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <SignInPage />
      </DialogContent>
    </Dialog>
  );
};
