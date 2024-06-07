"user client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFormChangePasswordModal from "@/hooks/modals/useFormChangePassword";
import { ChevronsLeftRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const UserItem = () => {
  const { data: session } = useSession();
  const formChangePassword = useFormChangePasswordModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-sea-green-600"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={session?.user?.image ?? "/hero.svg"} />
            </Avatar>
            <span className="text-start font-bold line-clamp-1">
              {session?.user?.name}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-sea-green-400 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {session?.user?.email}
          </p>
          <div className=" flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image ?? "/hero.svg"} />
              </Avatar>{" "}
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{session?.user?.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground "
          onClick={() => {
            formChangePassword.onOpen();
          }}
        >
          <p className="pl-4">Change Password</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
